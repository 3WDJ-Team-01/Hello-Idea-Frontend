/* eslint-disable no-plusplus */
/* eslint-disable object-shorthand */
/* eslint-disable array-callback-return */
import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { getPathEndPoint } from 'tools/Path';

// initialize Actions
const GET_NODES = 'mindmap/GET_NODES'; // initialize Nodes
const GET_PATHS = 'mindmap/GET_PATHS'; // initialize & unshift Path

// Node Actions
const ADD_NODE = 'mindmap/ADD_NODE';
const ADD_PATH = 'mindmap/ADD_PATH';
const REMOVE_NODE = 'mindmap/REMOVE_NODE';
const TOGGLE_NODE_EDITING = 'mindmap/TOGGLE_NODE_EDITING';
const SET_NODE_DATA = 'mindmap/SET_NODE_DATA';
const SET_NODE_LOCATION = 'mindmap/SET_NODE_LOCATION'; // Node & Path ReLocation

export const getNodes = createAction(GET_NODES);
export const getPaths = createAction(GET_PATHS);
export const addNode = createAction(ADD_NODE);
export const addPath = createAction(ADD_PATH);
export const removeNode = createAction(REMOVE_NODE);
export const toggleNodeEditing = createAction(TOGGLE_NODE_EDITING);
export const setNodeData = createAction(SET_NODE_DATA);
export const setNodeLocation = createAction(SET_NODE_LOCATION);

const initialState = {
  nextNodeId: 0,
  cavasPins: {
    leftTop: { x: 0, y: 0 },
    rightBottom: { x: 0, y: 0 },
  },
  nodes: [
    // {
    //   "id": 0,
    //   "isEditing": false,
    //   "location": {
    //     "x": -1358.8887939453125,
    //     "y": -1407.77783203125
    //   },
    //   "size": {
    //     "width": 100,
    //     "height": 40
    //   },
    //   "color": "#ECF0F1",
    //   "head": "0",
    //   "parentOf": [1, 2],
    //   "childOf": null
    // },
  ],
  paths: [
    // {
    //   options: {
    //     mode: mode,
    //     color: start.color,
    //     endPosition: position,
    //   },
    //   startAt: {
    //     nodeId: start.id,
    //     width: start.size.width,
    //     height: start.size.height,
    //     x: start.location.x,
    //     y: start.location.y,
    //   },
    //   endAt: {
    //     nodeId: end.id,
    //     width: end.size.width,
    //     height: end.size.height,
    //     x: end.location.x,
    //     y: end.location.y,
    //   },
    // }
  ],
};

export default handleActions(
  {
    [GET_NODES]: (state, action) =>
      produce(state, draft => {
        draft.nodes = action.payload;
        draft.nextNodeId = action.payload.length;
      }),
    [GET_PATHS]: (state, action) =>
      produce(state, draft => {
        const prevCanvasPins = state.cavasPins;
        draft.paths = [];
        for (let i = action.payload.length - 1; i > -1; i--) {
          const indexOfChild = action.payload[i].childOf;

          const start = action.payload[indexOfChild];
          const end = action.payload[i];

          if (end.location.x < prevCanvasPins.leftTop.x) {
            prevCanvasPins.leftTop.x = end.location.x;
          } else if (end.location.x > prevCanvasPins.rightBottom.x) {
            prevCanvasPins.rightBottom.x = end.location.x;
          }

          if (end.location.y < prevCanvasPins.leftTop.y) {
            prevCanvasPins.leftTop.y = end.location.y;
          } else if (end.location.y > prevCanvasPins.rightBottom.y) {
            prevCanvasPins.rightBottom.y = end.location.y;
          }

          if (typeof indexOfChild === 'number') {
            if (end.parentOf.length > 0) {
              start.parentOf = start.parentOf.concat(end.parentOf);
            }
            const { mode, position } = getPathEndPoint(
              start.location,
              end.location,
              end.size,
            );

            draft.paths.unshift({
              options: {
                mode: mode,
                color: start.color,
                endPosition: position,
              },
              startAt: {
                nodeId: start.id,
                width: start.size.width,
                height: start.size.height,
                x: start.location.x,
                y: start.location.y,
              },
              endAt: {
                nodeId: end.id,
                width: end.size.width,
                height: end.size.height,
                x: end.location.x,
                y: end.location.y,
              },
            });
          } else {
            draft.paths.unshift({
              startAt: null,
              endAt: {
                nodeId: end.id,
                width: end.size.width,
                height: end.size.height,
                x: end.location.x,
                y: end.location.y,
              },
            });
          }
        }
        draft.canvasPins = prevCanvasPins;
      }),
    [ADD_NODE]: (state, action) =>
      produce(state, draft => {
        // recursive function for add relation to parent node
        const addChildNode = node => {
          const index = draft.nodes.findIndex(item => item.id === node.childOf);

          if (index > -1) {
            draft.nodes[index].parentOf.push(action.payload.id);
          }
          if (typeof node.childOf === 'number') {
            addChildNode(draft.nodes[index]);
          }
        };

        draft.nodes.push(action.payload);

        // add relation to parent node
        addChildNode(action.payload);

        draft.nextNodeId++;
      }),
    [ADD_PATH]: (state, action) =>
      produce(state, draft => {
        const { start, end } = action.payload;
        const { mode, position } = getPathEndPoint(
          start.location,
          end.location,
          end.size,
        );
        if (start === end)
          draft.paths.push({
            options: {
              mode: mode,
              color: start.color,
              endPosition: position,
            },
            startAt: null,
            endAt: {
              nodeId: end.id,
              width: end.size.width,
              height: end.size.height,
              x: end.location.x,
              y: end.location.y,
            },
          });
        else
          draft.paths.push({
            options: {
              mode: mode,
              color: start.color,
              endPosition: position,
            },
            startAt: {
              nodeId: start.id,
              x: start.location.x,
              y: start.location.y,
            },
            endAt: {
              nodeId: end.id,
              width: end.size.width,
              height: end.size.height,
              x: end.location.x,
              y: end.location.y,
            },
          });
      }),
    [REMOVE_NODE]: (state, action) =>
      produce(state, draft => {
        const targetNodeIndex = state.nodes.findIndex(
          node => node.id === action.payload,
        );
        const targetNode = state.nodes[targetNodeIndex];

        // recursive function for remove relation to parent node
        const removeChildNode = nodeId => {
          const childNodeIndex = draft.nodes.findIndex(
            node => node.id === nodeId,
          );
          const childNode = draft.nodes[childNodeIndex];
          const parentNodeIndex = draft.nodes.findIndex(
            node => node.id === childNode.childOf,
          );
          const parentNode = draft.nodes[parentNodeIndex];

          if (parentNodeIndex > -1) {
            parentNode.parentOf.splice(parentNode.parentOf.indexOf(nodeId), 1);
            if (typeof parentNode.childOf === 'number')
              removeChildNode(parentNode.id);
          }
        };

        // if target node has child nodes, remove all child nodes & paths
        if (targetNode.parentOf.length > 0) {
          targetNode.parentOf.map(nodeId => {
            // remove children relation
            removeChildNode(nodeId);

            // remove children node & path
            const nodeIndex = draft.nodes.findIndex(item => item.id === nodeId);
            draft.nodes.splice(nodeIndex, 1);
            const pathIndex = draft.paths.findIndex(
              path => path.endAt && path.endAt.nodeId === nodeId,
            );
            draft.paths.splice(pathIndex, 1);
          });
        }

        // remove target relation
        removeChildNode(action.payload);

        // remove target node & path
        draft.nodes.splice(
          state.nodes.findIndex(node => node.id === action.payload),
          1,
        );
        draft.paths.splice(
          state.paths.findIndex(
            path => path.endAt && path.endAt.nodeId === action.payload,
          ),
          1,
        );
      }),
    [TOGGLE_NODE_EDITING]: (state, action) =>
      produce(state, draft => {
        const index = draft.nodes.findIndex(node => node.id === action.payload);

        draft.nodes[index].isEditing = !state.nodes[index].isEditing;
      }),
    [SET_NODE_DATA]: (state, action) =>
      produce(state, draft => {
        const { id, isEditing, location, size, color, head } = action.payload;
        const index = draft.nodes.findIndex(node => node.id === id);
        draft.nodes[index] = {
          ...state.nodes[index],
          ...action.payload,
        };
        state.paths.map((path, i) => {
          if (path.startAt && path.startAt.nodeId === id)
            draft.paths[i].options.color = color;
        });
      }),
    [SET_NODE_LOCATION]: (state, action) =>
      produce(state, draft => {
        const index = draft.nodes.findIndex(
          node => node.id === action.payload.id,
        );

        draft.nodes[index].location.x = action.payload.location.x;
        draft.nodes[index].location.y = action.payload.location.y;

        if (action.payload.location.x < state.cavasPins.leftTop.x) {
          draft.cavasPins.leftTop.x = action.payload.location.x;
        } else if (action.payload.location.x > state.cavasPins.rightBottom.x) {
          draft.cavasPins.rightBottom.x = action.payload.location.x;
        }

        if (action.payload.location.y < state.cavasPins.leftTop.y) {
          draft.cavasPins.leftTop.y = action.payload.location.y;
        } else if (action.payload.location.y > state.cavasPins.rightBottom.y) {
          draft.cavasPins.rightBottom.y = action.payload.location.y;
        }
        // reset location of the path
        draft.paths.map((path, i) => {
          if (path.startAt) {
            if (path.startAt.nodeId === draft.nodes[index].id) {
              const { mode, position } = getPathEndPoint(
                action.payload.location,
                path.endAt,
                path.endAt,
              );
              path.options.mode = mode;
              path.options.endPosition = position;
              path.startAt.x = action.payload.location.x;
              path.startAt.y = action.payload.location.y;
            } else if (path.endAt.nodeId === draft.nodes[index].id) {
              const { mode, position } = getPathEndPoint(
                path.startAt,
                action.payload.location,
                path.endAt,
              );
              path.options.mode = mode;
              path.options.endPosition = position;
              path.endAt.x = action.payload.location.x;
              path.endAt.y = action.payload.location.y;

              if (action.payload.size) {
                path.endAt.width = action.payload.size.width;
                path.endAt.height = action.payload.size.height;
              }
            }
          }
        });
      }),
  },
  initialState,
);
