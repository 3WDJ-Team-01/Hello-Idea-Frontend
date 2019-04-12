/* eslint-disable no-plusplus */
/* eslint-disable object-shorthand */
/* eslint-disable array-callback-return */
import produce from 'immer';
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

export const getNodes = data => ({ type: GET_NODES, data });
export const getPaths = data => ({ type: GET_PATHS, data });

export const addPath = ({ start, end }) => ({
  type: ADD_PATH,
  path: { start: start, end: end },
});
export const addNode = node => ({ type: ADD_NODE, node });
export const removeNode = nodeId => ({ type: REMOVE_NODE, nodeId });
export const toggleNodeEditing = id => ({ type: TOGGLE_NODE_EDITING, id });
export const setNodeData = node => ({ type: SET_NODE_DATA, node });
export const setNodeLocation = node => ({ type: SET_NODE_LOCATION, node });

const initialState = {
  nextNodeId: 0,
  cavasPins: {
    leftTop: { x: 0, y: 0 },
    rightBottom: { x: 0, y: 0 },
  },
  nodes: [],
  paths: [],
};

export default function mindmap(state = initialState, action) {
  switch (action.type) {
    case GET_NODES:
      return produce(state, draft => {
        draft.nodes = action.data;
        draft.nextNodeId = action.data.length;
      });
    case GET_PATHS:
      return produce(state, draft => {
        const prevCanvasPins = state.cavasPins;
        draft.paths = [];
        for (let i = action.data.length - 1; i > -1; i--) {
          const indexOfChild = action.data[i].childOf;

          const start = action.data[indexOfChild];
          const end = action.data[i];

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
      });
    case ADD_PATH:
      return produce(state, draft => {
        const { start, end } = action.path;
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
      });
    case ADD_NODE:
      return produce(state, draft => {
        // recursive function for add relation to parent node
        const addChildNode = node => {
          const index = draft.nodes.findIndex(item => item.id === node.childOf);

          if (index > -1) {
            draft.nodes[index].parentOf.push(action.node.id);
          }
          if (typeof node.childOf === 'number') {
            addChildNode(draft.nodes[index]);
          }
        };

        draft.nodes.push(action.node);

        // add relation to parent node
        addChildNode(action.node);

        draft.nextNodeId++;
      });
    case REMOVE_NODE:
      return produce(state, draft => {
        const targetNodeIndex = state.nodes.findIndex(
          node => node.id === action.nodeId,
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
        removeChildNode(action.nodeId);

        // remove target node & path
        draft.nodes.splice(
          state.nodes.findIndex(node => node.id === action.nodeId),
          1,
        );
        draft.paths.splice(
          state.paths.findIndex(
            path => path.endAt && path.endAt.nodeId === action.nodeId,
          ),
          1,
        );
      });
    case TOGGLE_NODE_EDITING:
      return produce(state, draft => {
        const index = draft.nodes.findIndex(node => node.id === action.id);

        draft.nodes[index].isEditing = !state.nodes[index].isEditing;
      });
    case SET_NODE_DATA:
      return produce(state, draft => {
        const { id, isEditing, location, size, color, head } = action.node;
        const index = draft.nodes.findIndex(node => node.id === id);
        draft.nodes[index] = {
          ...state.nodes[index],
          ...action.node,
        };
        state.paths.map((path, i) => {
          if (path.startAt && path.startAt.nodeId === id)
            draft.paths[i].options.color = color;
        });
      });

    case SET_NODE_LOCATION:
      return produce(state, draft => {
        const index = draft.nodes.findIndex(node => node.id === action.node.id);

        draft.nodes[index].location.x = action.node.location.x;
        draft.nodes[index].location.y = action.node.location.y;

        if (action.node.location.x < state.cavasPins.leftTop.x) {
          draft.cavasPins.leftTop.x = action.node.location.x;
        } else if (action.node.location.x > state.cavasPins.rightBottom.x) {
          draft.cavasPins.rightBottom.x = action.node.location.x;
        }

        if (action.node.location.y < state.cavasPins.leftTop.y) {
          draft.cavasPins.leftTop.y = action.node.location.y;
        } else if (action.node.location.y > state.cavasPins.rightBottom.y) {
          draft.cavasPins.rightBottom.y = action.node.location.y;
        }
        // reset location of the path
        draft.paths.map((path, i) => {
          if (path.startAt) {
            if (path.startAt.nodeId === draft.nodes[index].id) {
              const { mode, position } = getPathEndPoint(
                action.node.location,
                path.endAt,
                path.endAt,
              );
              path.options.mode = mode;
              path.options.endPosition = position;
              path.startAt.x = action.node.location.x;
              path.startAt.y = action.node.location.y;
            } else if (path.endAt.nodeId === draft.nodes[index].id) {
              const { mode, position } = getPathEndPoint(
                path.startAt,
                action.node.location,
                path.endAt,
              );
              path.options.mode = mode;
              path.options.endPosition = position;
              path.endAt.x = action.node.location.x;
              path.endAt.y = action.node.location.y;

              if (action.node.size) {
                path.endAt.width = action.node.size.width;
                path.endAt.height = action.node.size.height;
              }
            }
          }
        });
      });
    default:
      return state;
  }
}
