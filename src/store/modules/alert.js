/* eslint-disable array-callback-return */
/* eslint-disable no-multi-assign */
import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

// websocket url path origin
const url = `${process.env.REACT_APP_WS_URL_ORIGIN}/ws/test`;

const WS_OPEN = 'alert/WS_OPEN';
const WS_MESSAGE = 'alert/WS_MESSAGE';
const WS_CLOSE = 'alert/WS_CLOSE';
const WS_SEND = 'alert/WS_SEND';
const CHECK_ALERTS = 'alert/CHECK_ALERTS';
const ADD_NOTIFICATIONS = 'alert/ADD_NOTIFICATIONS';
const ADD_REQUESTS = 'alert/ADD_REQUESTS';

export const wsOpen = createAction(WS_OPEN);
export const wsMessage = createAction(WS_MESSAGE);
export const wsClose = createAction(WS_CLOSE);
export const wsSend = createAction(WS_SEND);
export const checkAlerts = createAction(CHECK_ALERTS);
export const addNotifications = createAction(ADD_NOTIFICATIONS);
export const addRequests = createAction(ADD_REQUESTS);

export const connectToWebsocket = user_id => dispatch => {
  const ws = new WebSocket(`${url}/${user_id}/`);
  ws.onopen = () => {
    dispatch(wsOpen(ws));
    axios.post('/api/check/', { user_id }).then(({ data }) => {
      dispatch(checkAlerts(data));
    });
  };
  ws.onmessage = receive => {
    const { id, message } = JSON.parse(receive.data);

    axios.post('/api/check/', { user_id }).then(({ data }) => {
      if (message === 'notifications') {
        const { notifications } = data;
        const notifyIndex = notifications.findIndex(
          ({ notify_id }) => notify_id === id,
        );
        const notify = notifications[notifyIndex];

        dispatch(addNotifications(notify));
      } else if (message === 'requests') {
        // dispatch(addRequests(request));
      }
    });
  };

  // dispatch(wsOnmessage(onMessage));
};

/**
 * [send_id] // user_id to sending notification
 * [receive_id] // user_id to receive notification
 * [target_id] // target_id to notified contents
 * [notify_cont]
 * @follow   :: other person follow me
 * @create   :: following person create new repository
 * @like     :: other person likeed my repository
 * @fork     :: other person forked my repository
 */

export const sendNotify = ({
  send_id,
  receive_id,
  target_id,
  type,
}) => dispatch => {
  const receive_list = receive_id.filter(
    (item, index) => receive_id.indexOf(item) === index,
  );

  axios.post('/api/notify/send/', {
    send_id,
    receive_id: receive_list,
    target_id,
    notify_cont: type,
  });
};

const initialState = {
  state: '',
  websocket: null,
  notifications: [],
  requests: [],
};

export default handleActions(
  {
    [WS_OPEN]: (state, action) =>
      produce(state, draft => {
        draft.state = 'pending';
        draft.websocket = action.payload;
      }),
    [CHECK_ALERTS]: (state, action) =>
      produce(state, draft => {
        const { notifications, requests } = action.payload;
        draft.state = 'success';
        notifications.map(notify => {
          draft.notifications.push(notify);
        });
        draft.requests = action.payload.requests;
      }),
    [ADD_NOTIFICATIONS]: (state, action) =>
      produce(state, draft => {
        draft.notifications.unshift(action.payload);
      }),
  },
  initialState,
);
