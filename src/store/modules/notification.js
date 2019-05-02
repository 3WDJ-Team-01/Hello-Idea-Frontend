/* eslint-disable no-multi-assign */
import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

// websocket url path origin
const url = `${process.env.REACT_APP_WS_URL_ORIGIN}/ws/test`;

const WS_CONNECT = 'notification/WS_CONNECT';
const WS_ONMESSAGE = 'notification/WS_ONMESSAGE';
const WS_CLOSE = 'notification/WS_CLOSE';
const WS_SEND = 'notification/WS_SEND';

export const wsConnect = createAction(WS_CONNECT);
export const wsOnmessage = createAction(WS_ONMESSAGE);
export const wsClose = createAction(WS_CLOSE);
export const wsSend = createAction(WS_SEND);

export const connectToWebsocket = user_id => dispatch => {
  const ws = new WebSocket(`${url}/${user_id}/`);
  ws.onmessage = message => {
    console.log(JSON.parse(message.data));
  };
  console.log(`${url}/${user_id}/`);
  ws.onopen = function(e) {
    console.log('연결 성공');
  };

  dispatch(wsConnect(ws));
  // dispatch(wsOnmessage(onMessage));
};

const initialState = {
  websocket: null,
};

export default handleActions(
  {
    [WS_CONNECT]: (state, action) =>
      produce(state, draft => {
        draft.websocket = action.payload;
      }),
  },
  initialState,
);
