import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const url = `${process.env.REACT_APP_WS_URL_ORIGIN}/ws/chat`;

const WS_OPEN = 'group/WS_OPEN';
const WS_MESSAGE = 'group/WS_MESSAGE';
const WS_CLOSE = 'group/WS_CLOSE';
const WS_SEND = 'group/WS_SEND';
const LOAD_ALL_CHATS = 'group/LOAD_ALL_CHATS';
const PEOPLE = 'group/PEOPLE';
const PEOPLE_SUCCESS = 'group/PEOPLE_SUCCESS';
const PEOPLE_FAILURE = 'group/PEOPLE_FAILURE';
const INFO = 'group/INFO';
const INFO_SUCCESS = 'group/INFO_SUCCESS';
const INFO_FAILURE = 'group/INFO_FAILURE';

export const wsOpen = createAction(WS_OPEN);
export const wsMessage = createAction(WS_MESSAGE);
export const wsClose = createAction(WS_CLOSE);
export const wsSend = createAction(WS_SEND);
export const loadAllChats = createAction(LOAD_ALL_CHATS);
export const people = createAction(PEOPLE);
export const peopleSuccess = createAction(PEOPLE_SUCCESS);
export const peopleFailure = createAction(PEOPLE_FAILURE);
export const info = createAction(INFO);
export const infoSuccess = createAction(INFO_SUCCESS);
export const infoFailure = createAction(INFO_FAILURE);

export const peopleRequest = group_id => dispatch => {
  dispatch(people());
  return axios
    .post('/api/group_entry/', { group_id })
    .then(res => {
      dispatch(peopleSuccess(res.data));
    })
    .catch(err => {
      if (err.response) dispatch(peopleFailure(err.response));
    });
};
export const infoRequest = group_id => dispatch => {
  dispatch(info());
  return axios
    .post('/api/group/detail/', { group_id })
    .then(res => {
      dispatch(infoSuccess(res.data));
    })
    .catch(err => {
      if (err.response) dispatch(infoFailure(err.response));
    });
};

export const connectToWebsocket = project_id => dispatch => {
  axios.post('/api/chat/', { project_id }).then(({ data }) => {
    const { chat_id, chat_cont_all } = data;
    const ws = new WebSocket(`${url}/${chat_id}/`);

    dispatch(loadAllChats(chat_cont_all));
    ws.onopen = () => {
      dispatch(wsOpen({ ws, chat_id }));
    };
    ws.onmessage = receive => {
      const resData = JSON.parse(receive.data);
      dispatch(wsMessage(resData));
    };
  });
};

const initialState = {
  state: {
    people: '',
    info: '',
  },
  websocket: null,
  chat_id: 0,
  people: [],
  messages: [],
  info: {
    group_name: '',
    group_img: '',
    group_bgimg: '',
    group_intro: '',
    user_id: '',
  },
};

export default handleActions(
  {
    [PEOPLE]: (state, action) =>
      produce(state, draft => {
        draft.state.people = 'pending';
      }),
    [PEOPLE_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.state.people = 'success';
        draft.people = action.payload;
      }),
    [PEOPLE_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state.people = 'failure';
        draft.people = [];
      }),
    [INFO]: (state, action) =>
      produce(state, draft => {
        draft.state.info = 'pending';
      }),
    [INFO_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.state.info = 'success';
        draft.info = action.payload;
      }),
    [INFO_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state.info = 'failure';
        draft.info = {
          group_name: '',
          group_img: '',
          group_bgimg: '',
          group_intro: '',
          user_id: '',
        };
      }),
    [LOAD_ALL_CHATS]: (state, action) =>
      produce(state, draft => {
        draft.messages = action.payload.reverse();
      }),
    [WS_OPEN]: (state, action) =>
      produce(state, draft => {
        draft.websocket = action.payload.ws;
        draft.chat_id = action.payload.chat_id;
      }),
    [WS_MESSAGE]: (state, action) =>
      produce(state, draft => {
        const { message, user } = action.payload;
        draft.messages.push({
          chat_cont: message,
          ...user,
        });
      }),
    [WS_SEND]: (state, action) => {
      const { chat_id } = state;
      const { user_id, message } = action.payload;
      // views chat api 부분 chat_id에 해당하는 유저정보 반환하기
      // 이름, 이미지, 아이디
      state.websocket.send(
        JSON.stringify({
          chat_id,
          user_id,
          message,
        }),
      );
      return state;
    },
  },
  initialState,
);
