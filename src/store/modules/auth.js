import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const INITIALIZE_INPUT = 'auth/INITIALIZE_INPUT';
const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';
const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
const INITIALIZE_ERROR = 'auth/INITIALIZE_ERROR';
const CHECK_USER = 'auth/CHECK_USER';
const CHECK_USER_SUCCESS = 'auth/CHECK_USER_SUCCESS';
const CHECK_USER_FAILURE = 'auth/CHECK_USER_FAILURE';
const SET_USER_TEMP = 'auth/SET_USER_TEMP';
const LOGOUT = 'auth/LOGOUT';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const LOGOUT_FAILURE = 'auth/LOGOUT_FAILURE';

export const initializeInput = createAction(INITIALIZE_INPUT);
export const changeInput = createAction(CHANGE_INPUT);
export const register = createAction(REGISTER);
export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerFailure = createAction(REGISTER_FAILURE);
export const login = createAction(LOGIN);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFailure = createAction(LOGIN_FAILURE);
export const initializeError = createAction(INITIALIZE_ERROR);
export const checkUser = createAction(CHECK_USER);
export const checkUserSuccess = createAction(CHECK_USER_SUCCESS);
export const checkUserFailure = createAction(CHECK_USER_FAILURE);
export const setUserTemp = createAction(SET_USER_TEMP);
export const logout = createAction(LOGOUT);
export const logoutSuccess = createAction(LOGOUT_SUCCESS);
export const logoutFailure = createAction(LOGOUT_FAILURE);

export const registerRequest = data => dispatch => {
  dispatch(register());
  return axios
    .post('/api/auth/register/', {
      ...data,
      user_img: 'test',
      user_bgimg: 'test',
    })
    .then(res => {
      axios
        .post('/api/person_tendency/create/', { user_id: res.data.user_id })
        .then(() => dispatch(registerSuccess(res.data)));
    })
    .catch(err => {
      if (err.response) dispatch(registerFailure(err.response));
    });
};
export const loginRequest = data => dispatch => {
  axios.defaults.headers.common.Authorization = '';
  dispatch(login());
  return axios
    .post('/api/auth/login/', data)
    .then(res => {
      dispatch(loginSuccess(res.data));
    })
    .catch(err => {
      if (err.response) dispatch(loginFailure(err.response));
    });
};
export const logoutRequest = () => dispatch => {
  dispatch(logout());
  return axios
    .post('/api/auth/logout/')
    .then(res => {
      axios.defaults.headers.common.Authorization = '';
      localStorage.removeItem('userInfo');
      dispatch(logoutSuccess(res.data));
    })
    .catch(err => {
      if (err.response) dispatch(logoutFailure(err.response));
    });
};
export const userRequest = () => dispatch => {
  const token = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')).token
    : null;
  axios.defaults.headers.common.Authorization = `token ${token}`;
  dispatch(checkUser());
  return axios
    .get('/api/auth/user/')
    .then(res => {
      dispatch(checkUserSuccess(res.data));
    })
    .catch(err => {
      axios.defaults.headers.common.Authorization = '';
      localStorage.removeItem('userInfo');
      if (err.response) dispatch(checkUserFailure(err.response));
    });
};

const initialState = {
  state: '',
  error: {
    triggered: false,
    message: '',
  },
  logged: false,
  userInfo: {
    user_id: null,
    user_name: '',
    token: null,
  },
};

export default handleActions(
  {
    [REGISTER]: (state, action) =>
      produce(state, draft => {
        draft.state = 'pending';
      }),
    [REGISTER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.logged = true;
        draft.state = 'success';
        draft.userInfo = {
          user_id: action.payload.id,
          user_name: action.payload.user_name,
          token: action.payload.token,
        };
      }),
    [REGISTER_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state = 'failure';
        switch (action.payload.status) {
          case 400:
            draft.error = {
              triggered: true,
              message: '잘못된 이메일 형식입니다.',
            };
            break;
          case 500:
            draft.error = {
              triggered: true,
              message: 'TOO SHORT EMAIL OR PASSWORD',
            };
            break;
          default:
            break;
        }
      }),
    [LOGIN]: (state, action) =>
      produce(state, draft => {
        draft.state = 'pending';
      }),
    [LOGIN_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.logged = true;
        draft.state = 'success';
        draft.userInfo = {
          user_id: action.payload.user.user_id,
          user_name: action.payload.user.user_name,
          token: action.payload.token,
        };
      }),
    [LOGIN_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state = 'failure';
        switch (action.payload.status) {
          case 400:
            draft.error = {
              triggered: true,
              message: '아이디 혹은 비밀번호가 일치하지 않습니다.',
            };
            break;
          case 500:
            draft.error = {
              triggered: true,
              message: 'PLEASE TRY AGAIN',
            };
            break;
          default:
            break;
        }
      }),
    [INITIALIZE_ERROR]: (state, action) =>
      produce(state, draft => {
        draft.error = {
          triggered: false,
          message: '',
        };
      }),
    [CHECK_USER]: (state, action) =>
      produce(state, draft => {
        draft.state = 'pending';
      }),
    [CHECK_USER_SUCCESS]: state =>
      produce(state, draft => {
        draft.logged = true;
        draft.state = 'success';
      }),
    [CHECK_USER_FAILURE]: state =>
      produce(state, draft => {
        draft.logged = false;
        draft.state = 'failure';
        draft.userInfo = {
          user_id: null,
          user_name: '',
          token: null,
        };
      }),
    [SET_USER_TEMP]: (state, action) =>
      produce(state, draft => {
        draft.logged = true;
        draft.userInfo = {
          user_id: action.payload.user_id,
          user_name: action.payload.user_name,
          token: action.payload.token,
        };
      }),
    [LOGOUT]: (state, action) =>
      produce(state, draft => {
        draft.state = 'pending';
      }),
    [LOGOUT_SUCCESS]: state =>
      produce(state, draft => {
        draft.logged = false;
        draft.userInfo = {
          user_id: null,
          user_name: '',
          token: null,
        };
        draft.state = 'success';
      }),
    [LOGOUT_FAILURE]: state =>
      produce(state, draft => {
        draft.error = {
          triggered: true,
          message: 'LOGOUT ERROR, PLEASE TRY AGAIN',
        };
        draft.state = 'failure';
      }),
  },
  initialState,
);
