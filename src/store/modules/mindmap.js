/* eslint-disable no-plusplus */
/* eslint-disable object-shorthand */
/* eslint-disable array-callback-return */
import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { getPathEndPoint } from 'tools/Path';

const url = `${process.env.REACT_APP_WS_URL_ORIGIN}/ws/work`;

// initialize Actions
const INITIALIZE = 'mindmap/INITIALIZE';
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

// Group Work Actions
const WS_OPEN = 'mindmap/WS_OPEN';
const WS_MESSAGE = 'mindmap/WS_MESSAGE';
const WS_CLOSE = 'mindmap/WS_CLOSE';
const WS_SEND = 'mindmap/WS_SEND';

export const initialize = createAction(INITIALIZE);
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
export const wsOpen = createAction(WS_OPEN);
export const wsMessage = createAction(WS_MESSAGE);
export const wsClose = createAction(WS_CLOSE);
export const wsSend = createAction(WS_SEND);

// Communication
export const loadIdeasRequest = project_id => dispatch => {
  dispatch(getNodes());
  return axios
    .post('/api/idea/load/', { project_id })
    .then(res => {
      axios.post('/api/idea/root/select/', { project_id }).then(({ data }) => {
        dispatch(setSourceNode({ data, list: res.data }));
        dispatch(getNodesSuccess({ project_id, list: res.data }));
      });
    })
    .catch(err => {
      if (err.response) dispatch(getNodesFailure(err.response));
    });
};
export const createIdeaRequest = data => dispatch => {
  dispatch(addNode());
  if (data.isForked > 0) {
    return axios
      .post('/api/idea/fork/create/', {
        user_id: data.user_id,
        idea_id: data.isForked,
        project_id: data.project_id,
        parent_id: data.childOf,
        is_forked: data.isForked,
      })
      .then(res => {
        const { idea_id } = res.data;
        const node = { ...data, id: idea_id };
        dispatch(addNodeSuccess(node));
        dispatch(addPath({ start: data.childOf, end: node }));
        axios.post('/api/idea/fork/history/', {
          user_id: data.user_id,
          idea_id: data.isForked,
        });
        axios.post('/api/idea/loc/create/', {
          idea_id,
          idea_x: data.location.x,
          idea_y: data.location.y,
          idea_width: data.size.width,
          idea_height: data.size.height,
        });
        if (data.childOf > 0)
          axios.post('/api/idea/child/create/', {
            idea_id: data.childOf,
            child_id: res.data.idea_id,
          });
      });
  }
  return axios
    .post('/api/idea/create/', {
      project_id: data.project_id,
      user_id: data.user_id,
      is_forked: data.isForked,
      parent_id: data.childOf,
      idea_color: data.color,
    })
    .then(res => {
      const node = { ...data, id: res.data.idea_id };
      dispatch(addNodeSuccess(node));
      dispatch(addPath({ start: data.childOf, end: node }));
      axios.post('/api/idea/loc/create/', {
        idea_id: res.data.idea_id,
        idea_x: data.location.x,
        idea_y: data.location.y,
        idea_width: data.size.width,
        idea_height: data.size.height,
      });
      if (data.childOf !== 0) {
        axios.post('/api/idea/child/create/', {
          idea_id: data.childOf,
          child_id: res.data.idea_id,
        });
      }
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
      dispatch(wsSend());
    })
    .catch(err => {
      dispatch(removeNodeFailure());
    });
};
export const updateIdeaRequest = data => dispatch => {
  dispatch(setNodeData(data));
  dispatch(setNodeLocation(data));
  const project_id = window.location.pathname.split('/')[4];
  if (data.id === 0) {
    return axios
      .post('/api/idea/root/update/', {
        idea_cont: data.head,
        idea_color: data.color,
        idea_width: data.size.width,
        idea_height: data.size.height,
        project_id,
      })
      .then(res => {
        dispatch(setNodeDataSuccess());
        dispatch(wsSend());
      })
      .catch(err => {
        dispatch(setNodeDataFailure());
      });
  }
  if (data.isForked > 0)
    return axios
      .post('/api/idea/update/', {
        idea_id: data.id,
        idea_cont: data.head,
        idea_color: data.color,
      })
      .then(res => {
        dispatch(setNodeDataSuccess());
        axios
          .post('/api/idea/loc/update/', {
            idea_id: data.id,
            idea_x: data.location.x,
            idea_y: data.location.y,
            idea_width: data.size.width,
            idea_height: data.size.height,
          })
          .then(() => {
            dispatch(wsSend());
          });
      })
      .catch(err => {
        dispatch(setNodeDataFailure());
      });
  if (data.head)
    return axios
      .post('/api/idea/update/', {
        idea_id: data.id,
        idea_cont: data.head,
        idea_color: data.color,
      })
      .then(res => {
        dispatch(setNodeDataSuccess());
        axios
          .post('/api/idea/loc/update/', {
            idea_id: data.id,
            idea_x: data.location.x,
            idea_y: data.location.y,
            idea_width: data.size.width,
            idea_height: data.size.height,
          })
          .then(() => {
            dispatch(wsSend());
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
        dispatch(setNodeDataFailure());
      });
  return axios
    .post('/api/idea/loc/update/', {
      idea_id: data.id,
      idea_x: data.location.x,
      idea_y: data.location.y,
      idea_width: data.size.width,
      idea_height: data.size.height,
    })
    .then(() => {
      dispatch(setNodeDataSuccess());
      dispatch(wsSend());
    })
    .catch(err => {
      dispatch(setNodeDataFailure());
    });
};
export const connectToWebsocket = (project_id, user_id) => dispatch => {
  const ws = new WebSocket(`${url}/${project_id}/${user_id}/`);
  ws.onopen = () => {
    dispatch(wsOpen(ws));
  };
  ws.onmessage = receive => {
    const resData = JSON.parse(receive.data);
    dispatch(wsMessage(resData));
  };
};

const initialState = {
  state: {
    create: '',
    read: '',
    update: '',
    delete: '',
  },
  canvasPins: {
    leftTop: { x: -window.innerWidth / 2, y: -window.innerHeight / 2 },
    rightBottom: { x: 0, y: 0 },
  },
  project_id: 0,
  websocket: null,
  participants: [],
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
    [INITIALIZE]: state =>
      produce(state, draft => {
        draft.state = {
          create: '',
          read: '',
          update: '',
          delete: '',
        };
        draft.canvasPins = {
          leftTop: { x: -window.innerWidth / 2, y: -window.innerHeight / 2 },
          rightBottom: { x: 0, y: 0 },
        };
        draft.nodes = [];
        draft.paths = [];
      }),
    [SET_SOURCE_NODE]: (state, action) =>
      produce(state, draft => {
        const { data, list } = action.payload;
        /*
          size: {
            width: 150,
            height: 40,
          },
          color: '#ECF0F1',
          head: 'Right click to edit',
        */

        draft.nodes = [
          {
            id: 0,
            isEditing: false,
            location: {
              x: 0,
              y: 0,
            },
            size: {
              width: data.idea_width,
              height: data.idea_height,
            },
            color: data.idea_color,
            head: data.idea_cont,
            parentOf: [],
            childOf: null,
          },
        ];
        list.map(node => {
          if (node.parent_id === 0) {
            draft.nodes[0].parentOf.push(node.idea_id);
          }
        });
      }),
    [GET_NODES]: (state, action) =>
      produce(state, draft => {
        draft.state.read = 'pending';
      }),
    // communication response
    [GET_NODES_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { nodes } = state;
        const { project_id, list } = action.payload;
        draft.project_id = project_id;
        draft.state.read = 'success';

        // Get Node List
        list.map(node =>
          nodes.push({
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
            hasFfile: node.file_check,
          }),
        );
        draft.nodes = nodes;

        // Get Path List
        const prevCanvasPins = state.canvasPins;
        draft.paths = [];
        for (let i = nodes.length - 1; i > -1; i--) {
          const parentIndex = nodes.findIndex(
            item => item.id === nodes[i].childOf,
          );

          const start = nodes[parentIndex];
          const end = nodes[i];
          if (end.location.x < prevCanvasPins.leftTop.x) {
            prevCanvasPins.leftTop.x = end.location.x - 40;
          } else if (end.location.x > prevCanvasPins.rightBottom.x) {
            prevCanvasPins.rightBottom.x = end.location.x + 200;
          }

          if (end.location.y < prevCanvasPins.leftTop.y) {
            prevCanvasPins.leftTop.y = end.location.y - 40;
          } else if (end.location.y > prevCanvasPins.rightBottom.y) {
            prevCanvasPins.rightBottom.y = end.location.y + 40;
          }

          if (parentIndex > -1) {
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
    [GET_NODES_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state.read = 'failure';
      }),
    [GET_PATHS]: (state, action) =>
      produce(state, draft => {
        const prevCanvasPins = state.canvasPins;
        draft.paths = [];
        for (let i = action.payload.length - 1; i > -1; i--) {
          const parentIndex = action.payload.findIndex(
            item => item.id === action.payload[i].childOf,
          );

          const start = action.payload[parentIndex];
          const end = action.payload[i];
          if (end.location.x < prevCanvasPins.leftTop.x) {
            prevCanvasPins.leftTop.x = end.location.x - 40;
          } else if (end.location.x > prevCanvasPins.rightBottom.x) {
            prevCanvasPins.rightBottom.x = end.location.x + 200;
          }

          if (end.location.y < prevCanvasPins.leftTop.y) {
            prevCanvasPins.leftTop.y = end.location.y - 40;
          } else if (end.location.y > prevCanvasPins.rightBottom.y) {
            prevCanvasPins.rightBottom.y = end.location.y + 40;
          }

          if (parentIndex > -1) {
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
        draft.state.create = 'pending';
      }),
    // communication response
    [ADD_NODE_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.state.create = 'success';
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
    [ADD_NODE_FAILURE]: state =>
      produce(state, draft => {
        draft.state.create = 'failure';
      }),
    [ADD_PATH]: (state, action) =>
      produce(state, draft => {
        const { start, end } = action.payload;
        const parent =
          state.nodes[state.nodes.findIndex(node => node.id === start)];
        const { mode, position } = getPathEndPoint(
          parent.location,
          end.location,
          end.size,
        );
        draft.paths.push({
          options: {
            mode: mode,
            color: parent.color,
            endPosition: position,
          },
          startAt: {
            nodeId: parent.id,
            x: parent.location.x,
            y: parent.location.y,
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
    [REMOVE_NODE]: state =>
      produce(state, draft => {
        draft.state.delete = 'pending';
      }),
    [REMOVE_NODE_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.state.delete = 'success';
        action.payload.map(nodeId => {
          const nodeIndex = draft.nodes.findIndex(item => item.id === nodeId);
          const pathIndex = draft.paths.findIndex(
            item => item.endAt.nodeId === nodeId,
          );

          draft.nodes.splice(nodeIndex, 1);
          draft.paths.splice(pathIndex, 1);
        });
        const prevCanvasPins = state.canvasPins;
        draft.nodes.forEach(node => {
          if (node.location.x < prevCanvasPins.leftTop.x) {
            prevCanvasPins.leftTop.x = node.location.x - 40;
          } else if (node.location.x > prevCanvasPins.rightBottom.x) {
            prevCanvasPins.rightBottom.x = node.location.x + 200;
          }

          if (node.location.y < prevCanvasPins.leftTop.y) {
            prevCanvasPins.leftTop.y = node.location.y - 40;
          } else if (node.location.y > prevCanvasPins.rightBottom.y) {
            prevCanvasPins.rightBottom.y = node.location.y + 40;
          }
        });
      }),
    [REMOVE_NODE_FAILURE]: state =>
      produce(state, draft => {
        draft.state.delete = 'failure';
      }),
    [TOGGLE_NODE_EDITING]: (state, action) =>
      produce(state, draft => {
        const index = draft.nodes.findIndex(node => node.id === action.payload);

        draft.nodes[index].isEditing = !state.nodes[index].isEditing;
      }),
    [SET_NODE_DATA]: (state, action) =>
      produce(state, draft => {
        const { id, color } = action.payload;
        const index = draft.nodes.findIndex(node => node.id === id);

        draft.state.update = 'pending';
        draft.nodes[index] = {
          ...state.nodes[index],
          ...action.payload,
        };
        state.paths.map((path, i) => {
          if (path.startAt && path.startAt.nodeId === id)
            draft.paths[i].options.color = color;
        });
      }),
    [SET_NODE_DATA_SUCCESS]: state =>
      produce(state, draft => {
        draft.state.update = 'success';
      }),
    [SET_NODE_DATA_FAILURE]: state =>
      produce(state, draft => {
        draft.state.update = 'failure';
      }),
    [SET_NODE_LOCATION]: (state, action) =>
      produce(state, draft => {
        const index = draft.nodes.findIndex(
          node => node.id === action.payload.id,
        );
        draft.state.update = 'pending';
        const gapX = state.nodes[index].location.x - action.payload.location.x;
        const gapY = state.nodes[index].location.y - action.payload.location.y;

        // reset location all of the child path

        if (state.nodes[index].parentOf.length > 0) {
          state.nodes[index].parentOf.map(child => {
            const childIndex = draft.nodes.findIndex(node => node.id === child);
            if (childIndex > -1) {
              draft.nodes[childIndex].location.x -= gapX;
              draft.nodes[childIndex].location.y -= gapY;
            }
            const pathIndex = draft.paths.findIndex(
              path => path.endAt.nodeId === child,
            );
            if (pathIndex > -1) {
              draft.paths[pathIndex].startAt.x -= gapX;
              draft.paths[pathIndex].startAt.y -= gapY;
              draft.paths[pathIndex].endAt.x -= gapX;
              draft.paths[pathIndex].endAt.y -= gapY;
            }
          });
        }

        draft.nodes[index].location.x = action.payload.location.x;
        draft.nodes[index].location.y = action.payload.location.y;

        // adjust canvas horizontal size
        const prevCanvasPins = state.canvasPins;
        draft.nodes.forEach(node => {
          if (node.location.x < prevCanvasPins.leftTop.x) {
            prevCanvasPins.leftTop.x = node.location.x - 40;
          } else if (node.location.x > prevCanvasPins.rightBottom.x) {
            prevCanvasPins.rightBottom.x = node.location.x + 400;
          }

          if (node.location.y < prevCanvasPins.leftTop.y) {
            prevCanvasPins.leftTop.y = node.location.y - 40;
          } else if (node.location.y > prevCanvasPins.rightBottom.y) {
            prevCanvasPins.rightBottom.y = node.location.y + 40;
          }
        });

        // reset location of the path
        draft.paths.map((path, i) => {
          if (path.startAt && path.endAt.nodeId === draft.nodes[index].id) {
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
        });
      }),
    [WS_OPEN]: (state, action) =>
      produce(state, draft => {
        draft.websocket = action.payload;
      }),
    // message
    [WS_MESSAGE]: (state, action) =>
      produce(state, draft => {
        const { type, member, ideas, root_idea } = action.payload;
        if (type === 'member') {
          draft.participants = member.map(list => list.user);
        } else {
          const nodes = [
            {
              id: 0,
              isEditing: false,
              location: {
                x: 0,
                y: 0,
              },
              size: {
                width: root_idea.idea_width,
                height: root_idea.idea_height,
              },
              color: root_idea.idea_color,
              head: root_idea.idea_cont,
              parentOf: [],
              childOf: null,
            },
          ];
          ideas.map(node => {
            if (node.parent_id === 0) {
              draft.nodes[0].parentOf.push(node.idea_id);
            }
            nodes.push({
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
              hasFfile: node.file_check,
            });
          });
          draft.nodes = nodes;

          const prevCanvasPins = state.canvasPins;
          draft.paths = [];
          for (let i = nodes.length - 1; i > -1; i--) {
            const parentIndex = nodes.findIndex(
              item => item.id === nodes[i].childOf,
            );

            const start = nodes[parentIndex];
            const end = nodes[i];
            if (end.location.x < prevCanvasPins.leftTop.x) {
              prevCanvasPins.leftTop.x = end.location.x - 40;
            } else if (end.location.x > prevCanvasPins.rightBottom.x) {
              prevCanvasPins.rightBottom.x = end.location.x + 200;
            }

            if (end.location.y < prevCanvasPins.leftTop.y) {
              prevCanvasPins.leftTop.y = end.location.y - 40;
            } else if (end.location.y > prevCanvasPins.rightBottom.y) {
              prevCanvasPins.rightBottom.y = end.location.y + 40;
            }

            if (parentIndex > -1) {
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
        }
      }),
    [WS_SEND]: (state, action) => {
      const { project_id } = state;
      state.websocket.send(
        JSON.stringify({
          project_id,
        }),
      );
      return state;
    },
    [WS_CLOSE]: (state, action) =>
      produce(state, draft => {
        if (state.websocket) state.websocket.close();
        draft.websocket = null;
      }),
  },
  initialState,
);
