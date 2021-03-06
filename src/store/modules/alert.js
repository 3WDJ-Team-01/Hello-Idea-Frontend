/* eslint-disable array-callback-return */
/* eslint-disable no-multi-assign */
import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

// websocket url path origin
const url = `${process.env.REACT_APP_WS_URL_ORIGIN}/ws/alert`;

const WS_OPEN = 'alert/WS_OPEN';
const WS_MESSAGE = 'alert/WS_MESSAGE';
const WS_CLOSE = 'alert/WS_CLOSE';
const WS_SEND = 'alert/WS_SEND';
const CHECK_ALERTS = 'alert/CHECK_ALERTS';
const ADD_NOTIFICATIONS = 'alert/ADD_NOTIFICATIONS';
const ADD_REQUESTS = 'alert/ADD_REQUESTS';
const READ_ALL_NOTIFICATIONS = 'alert/READ_ALL_NOTIFICATIONS';
const REQUEST_IS_ACCEPTED = 'alert/REQUEST_IS_ACCEPTED';

export const wsOpen = createAction(WS_OPEN);
export const wsMessage = createAction(WS_MESSAGE);
export const wsClose = createAction(WS_CLOSE);
export const wsSend = createAction(WS_SEND);
export const checkAlerts = createAction(CHECK_ALERTS);
export const addNotifications = createAction(ADD_NOTIFICATIONS);
export const addRequests = createAction(ADD_REQUESTS);
export const readAllNotifications = createAction(READ_ALL_NOTIFICATIONS);
export const requestIsAccepted = createAction(REQUEST_IS_ACCEPTED);

export const connectToWebsocket = user_id => dispatch => {
  const ws = new WebSocket(`${url}/${user_id}/`);
  ws.onopen = () => {
    dispatch(wsOpen(ws));
    axios.post('/api/check/', { user_id }).then(({ data }) => {
      dispatch(checkAlerts({ data, user_id }));
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

        if (notify.send_id !== user_id) dispatch(addNotifications(notify));
      } else if (message === 'requests') {
        const { requests } = data;

        dispatch(addRequests(requests[0]));
      }
    });
  };
};

export const toggleAccepted = (request_id, is_accepted) => dispatch => {
  axios
    .post('/api/request_accept/', {
      request_id,
      is_accepted,
    })
    .then(() => {
      dispatch(
        requestIsAccepted({
          request_id,
          is_accepted,
        }),
      );
    });
};

export const readAllNotificationsRequest = user_id => dispatch => {
  axios.post('/api/notify/all/read/', { user_id }).then(() => {
    dispatch(readAllNotifications());
  });
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

export const sendRequest = ({
  send_id,
  receive_id,
  request_cont,
}) => dispatch => {
  axios.post('/api/request/send/', {
    send_id,
    receive_id,
    request_cont,
  });
};

const initialState = {
  state: '',
  websocket: null,
  newMessage: false,
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
        const { user_id } = action.payload;
        const { notifications, requests } = action.payload.data;
        draft.state = 'success';
        if (notifications && notifications.length > 0)
          notifications
            .filter(item => item.send_id !== user_id)
            .map(notify => {
              if (notify.target) draft.notifications.push(notify);
              if (!notify.read_at) draft.newMessage = true;
            });
        if (requests && requests.length > 0)
          requests.map(notify => {
            draft.requests.push(notify);
            if (!notify.is_accepted > 0) draft.newMessage = true;
          });
      }),
    [ADD_NOTIFICATIONS]: (state, action) =>
      produce(state, draft => {
        const notify = action.payload;

        draft.notifications.unshift(notify);
        if (!notify.read_at) draft.newMessage = true;
        else draft.newMessage = false;
      }),
    [ADD_REQUESTS]: (state, action) =>
      produce(state, draft => {
        const request = action.payload;

        draft.requests.unshift(request);
        draft.newMessage = true;
      }),
    [READ_ALL_NOTIFICATIONS]: state =>
      produce(state, draft => {
        draft.newMessage = false;
      }),
    [REQUEST_IS_ACCEPTED]: (state, action) =>
      produce(state, draft => {
        const { request_id, is_accepted } = action.payload;
        const index = state.requests.findIndex(
          req => req.request_id === request_id,
        );
        draft.requests[index].is_accepted = is_accepted;
      }),
  },
  initialState,
);
