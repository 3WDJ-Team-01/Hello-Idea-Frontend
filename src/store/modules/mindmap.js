/* eslint-disable no-else-return */
/* eslint-disable no-plusplus */
/* eslint-disable object-shorthand */
/* eslint-disable array-callback-return */
import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { getPathEndPoint } from 'tools/Path';

// initialize Actions
const SET_SOURCE_NODE = 'mindmap/SET_SOURCE_NODE';
const GET_NODES = 'mindmap/GET_NODES';
const GET_NODES_SUCCESS = 'mindmap/GET_NODES_SUCCESS';
const GET_NODES_FAILURE = 'mindmap/GET_NODES_FAILURE';
const GET_PATHS = 'mindmap/GET_PATHS';

// Node Actions
const ADD_NODE = 'mindmap/ADD_NODE';
const ADD_NODE_SUCCESS = 'mindmap/ADD_NODE_SUCCESS';
const ADD_NODE_FAILURE = 'mindmap/ADD_NODE_FAILURE';
const ADD_PATH = 'mindmap/ADD_PATH';
const REMOVE_NODE = 'mindmap/REMOVE_NODE';
const REMOVE_NODE_SUCCESS = 'mindmap/REMOVE_NODE_SUCCESS';
const REMOVE_NODE_FAILURE = 'mindmap/REMOVE_NODE_FAILURE';
const TOGGLE_NODE_EDITING = 'mindmap/TOGGLE_NODE_EDITING';
const SET_NODE_DATA = 'mindmap/SET_NODE_DATA';
const SET_NODE_DATA_SUCCESS = 'mindmap/SET_NODE_DATA_SUCCESS';
const SET_NODE_DATA_FAILURE = 'mindmap/SET_NODE_DATA_FAILURE';
const SET_NODE_LOCATION = 'mindmap/SET_NODE_LOCATION'; // Node & Path ReLocation

export const setSourceNode = createAction(SET_SOURCE_NODE);
export const getNodes = createAction(GET_NODES);
export const getNodesSuccess = createAction(GET_NODES_SUCCESS);
export const getNodesFailure = createAction(GET_NODES_FAILURE);
export const getPaths = createAction(GET_PATHS);
export const addNode = createAction(ADD_NODE);
export const addNodeSuccess = createAction(ADD_NODE_SUCCESS);
export const addNodeFailure = createAction(ADD_NODE_FAILURE);
export const addPath = createAction(ADD_PATH);
export const removeNode = createAction(REMOVE_NODE);
export const removeNodeSuccess = createAction(REMOVE_NODE_SUCCESS);
export const removeNodeFailure = createAction(REMOVE_NODE_FAILURE);
export const toggleNodeEditing = createAction(TOGGLE_NODE_EDITING);
export const setNodeData = createAction(SET_NODE_DATA);
export const setNodeDataSuccess = createAction(SET_NODE_DATA_SUCCESS);
export const setNodeDataFailure = createAction(SET_NODE_DATA_FAILURE);
export const setNodeLocation = createAction(SET_NODE_LOCATION);

// Communication
export const loadIdeasRequest = project_id => dispatch => {
  dispatch(getNodes());
  return axios
    .post('/api/idea/load/', { project_id })
    .then(res => {
      dispatch(setSourceNode());
      dispatch(getNodesSuccess(res.data));
    })
    .catch(err => {
      if (err.response) dispatch(getNodesFailure(err.response));
    });
};
export const createIdeaRequest = data => dispatch => {
  dispatch(addNode());
  return axios
    .post('/api/idea/create/', {
      project_id: data.project_id,
      user_id: data.user_id,
      is_forked: data.isForked,
      parent_id: data.childOf,
      idea_color: data.color,
    })
    .then(res => {
      axios
        .post('/api/idea/loc/create/', {
          idea_id: res.data.idea_id,
          idea_x: data.location.x,
          idea_y: data.location.y,
          idea_width: data.size.width,
          idea_height: data.size.height,
        })
        .then(() => {
          const node = { ...data, id: res.data.idea_id };
          dispatch(addNodeSuccess(node));
          dispatch(addPath({ start: 0, end: node }));
        });
    })
    .catch(err => {
      if (err.response) dispatch(addNodeFailure(err.response));
    });
};
export const removeIdeaRequest = idea_id => dispatch => {
  dispatch(removeNode());
  return axios
    .post('/api/idea/delete/', { idea_id })
    .then(res => {
      dispatch(removeNodeSuccess(idea_id));
    })
    .catch(err => {
      if (err.response) dispatch(removeNodeFailure(err.response));
    });
};
export const updateIdeaRequest = data => dispatch => {
  dispatch(setNodeData());
  if (data.head)
    return axios
      .post('/api/idea/update/', {
        idea_id: data.id,
        idea_cont: data.head,
        idea_color: data.color,
      })
      .then(res => {
        axios
          .post('/api/idea/loc/update/', {
            idea_id: data.id,
            idea_x: data.location.x,
            idea_y: data.location.y,
            idea_width: data.size.width,
            idea_height: data.size.height,
          })
          .then(() => {
            dispatch(setNodeDataSuccess(data));
            dispatch(setNodeLocation(data));
          });
        axios
          .post('/api/idea/keyword/create/', {
            idea_id: data.id,
            idea_cont: data.head,
          })
          .then(keyword => {
            axios.post('/api/idea/keyword/list/create/', {
              idea_id: data.id,
              idea_cont: keyword.data,
            });
          });
      })
      .catch(err => {
        if (err.response) dispatch(setNodeDataFailure(err.response));
      });
  else
    return axios
      .post('/api/idea/loc/update/', {
        idea_id: data.id,
        idea_x: data.location.x,
        idea_y: data.location.y,
        idea_width: data.size.width,
        idea_height: data.size.height,
      })
      .then(() => {
        dispatch(setNodeLocation(data));
      });
};

const initialState = {
  state: '',
  cavasPins: {
    leftTop: { x: -window.innerWidth / 2, y: -window.innerHeight / 2 },
    rightBottom: { x: 0, y: 0 },
  },
  nodes: [],
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
    [SET_SOURCE_NODE]: (state, action) =>
      produce(state, draft => {
        draft.nodes = [
          {
            id: 0,
            isEditing: false,
            location: {
              x: 0,
              y: 0,
            },
            size: {
              width: 100,
              height: 40,
            },
            color: '#ECF0F1',
            head: '0',
            parentOf: [1, 2],
            childOf: null,
          },
        ];
      }),
    [GET_NODES]: (state, action) =>
      produce(state, draft => {
        draft.state = 'pending';
      }),
    // communication response
    [GET_NODES_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.state = 'success';
        action.payload.map(node =>
          draft.nodes.push({
            id: node.idea_id,
            user_id: node.user_id,
            childOf: node.parent_id,
            head: node.idea_cont,
            isForked: node.is_forked,
            isEditing: false,
            color: node.idea_color,
            location: {
              x: node.idea_x,
              y: node.idea_y,
            },
            size: {
              width: node.idea_width,
              height: node.idea_height,
            },
            parentOf: node.child_id,
          }),
        );
      }),
    [GET_NODES_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state = 'failure';
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
        draft.state = 'pending';
      }),
    // communication response
    [ADD_NODE_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.state = 'success';
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
      }),
    [ADD_NODE_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state = 'failure';
      }),
    [ADD_PATH]: (state, action) =>
      produce(state, draft => {
        const { start, end } = action.payload;
        if (start === 0) {
          const { mode, position } = getPathEndPoint(
            state.nodes[0].location,
            end.location,
            end.size,
          );
          draft.paths.push({
            options: {
              mode: mode,
              color: state.nodes[0].color,
              endPosition: position,
            },
            startAt: {
              nodeId: state.nodes[0].id,
              x: state.nodes[0].location.x,
              y: state.nodes[0].location.y,
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
          const { mode, position } = getPathEndPoint(
            start.location,
            end.location,
            end.size,
          );
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
        }
      }),
    [REMOVE_NODE]: (state, action) =>
      produce(state, draft => {
        draft.state = 'pending';
      }),
    // communication response
    [REMOVE_NODE_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.state = 'success';
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
    [REMOVE_NODE_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state = 'failure';
      }),
    [TOGGLE_NODE_EDITING]: (state, action) =>
      produce(state, draft => {
        const index = draft.nodes.findIndex(node => node.id === action.payload);

        draft.nodes[index].isEditing = !state.nodes[index].isEditing;
      }),
    [SET_NODE_DATA]: (state, action) =>
      produce(state, draft => {
        draft.state = 'pending';
      }),
    // communication response
    [SET_NODE_DATA_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.state = 'success';
        const { id, color } = action.payload;
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
    [SET_NODE_DATA_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state = 'failure';
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
