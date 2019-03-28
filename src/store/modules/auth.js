import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const INITIALIZE_INPUT = 'auth/INITIALIZE_INPUT';
const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';
const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
const INITIALIZE_ERROR = 'auth/INITIALIZE_ERROR';
const CHECK_USER_SUCCESS = 'auth/CHECK_USER_SUCCESS';
const CHECK_USER_FAILURE = 'auth/CHECK_USER_FAILURE';
const SET_USER_TEMP = 'auth/SET_USER_TEMP';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const LOGOUT_FAILURE = 'auth/LOGOUT_FAILURE';

export const initializeInput = createAction(INITIALIZE_INPUT);
export const changeInput = createAction(CHANGE_INPUT);
export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerFailure = createAction(REGISTER_FAILURE);
export const login = createAction(LOGIN);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFailure = createAction(LOGIN_FAILURE);
export const initializeError = createAction(INITIALIZE_ERROR);
export const checkUserSuccess = createAction(CHECK_USER_SUCCESS);
export const checkUserFailure = createAction(CHECK_USER_FAILURE);
export const setUserTemp = createAction(SET_USER_TEMP);
export const logoutSuccess = createAction(LOGOUT_SUCCESS);
export const logoutFailure = createAction(LOGOUT_FAILURE);

export const registerRequest = data => dispatch => {
  return axios
    .post('/api/auth/register/', {
      ...data,
      user_img: 'test',
      user_bgimg: 'test',
    })
    .then(res => {
      dispatch(registerSuccess(res.data));
    })
    .catch(err => {
      if (err.response) dispatch(registerFailure(err.response));
    });
};
export const loginRequest = data => dispatch => {
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
  return axios
    .post('/api/auth/logout/')
    .then(res => {
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
  return axios
    .get('/api/auth/user/')
    .then(res => {
      dispatch(checkUserSuccess(res.data));
    })
    .catch(err => {
      axios.defaults.headers.common.Authorization = ``;
      if (err.response) dispatch(checkUserFailure(err.response));
    });
};

const initialState = {
  form: {
    user_email: '',
    password: '',
    user_name: '',
    user_birth_YYYY: '',
    user_birth_MM: '',
    user_birth_DD: '',
    user_gender: '',
  },
  error: {
    triggered: false,
    message: '',
  },
  logged: false,
  userInfo: {
    user_email: null,
    user_name: '',
    token: null,
  },
};

export default handleActions(
  {
    [INITIALIZE_INPUT]: state =>
      produce(state, draft => {
        draft.form = {
          user_email: '',
          password: '',
          user_name: '',
          user_birth_YYYY: '',
          user_birth_MM: '',
          user_birth_DD: '',
          user_gender: '',
        };
      }),
    [CHANGE_INPUT]: (state, action) =>
      produce(state, draft => {
        switch (action.payload.name) {
          case 'user_birth_YYYY':
            const d = new Date();
            if (action.payload.value <= d.getFullYear())
              draft.form[action.payload.name] = action.payload.value;
            break;
          case 'user_birth_MM':
            if (action.payload.value < 13)
              draft.form[action.payload.name] = action.payload.value;
            break;
          case 'user_birth_DD':
            if (action.payload.value < 32)
              draft.form[action.payload.name] = action.payload.value;
            break;
          default:
            draft.form[action.payload.name] = action.payload.value;
            break;
        }
      }),
    [REGISTER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.logged = true;
        draft.userInfo = {
          user_email: action.payload.user.user_email,
          user_name: action.payload.user.user_name,
          token: action.payload.token,
        };
      }),
    [REGISTER_FAILURE]: (state, action) =>
      produce(state, draft => {
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
    [LOGIN]: state => produce(state, draft => {}),
    [LOGIN_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.logged = true;
        draft.userInfo = {
          user_email: action.payload.user.user_email,
          user_name: action.payload.user.user_name,
          token: action.payload.token,
        };
      }),
    [LOGIN_FAILURE]: (state, action) =>
      produce(state, draft => {
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
    [CHECK_USER_SUCCESS]: state =>
      produce(state, draft => {
        draft.logged = true;
      }),
    [CHECK_USER_FAILURE]: state =>
      produce(state, draft => {
        draft.logged = false;
        draft.userInfo = {
          user_email: null,
          user_name: '',
          token: null,
        };
      }),
    [SET_USER_TEMP]: (state, action) =>
      produce(state, draft => {
        draft.logged = true;
        draft.userInfo = {
          user_email: action.payload.user_email,
          user_name: action.payload.user_name,
          token: action.payload.token,
        };
      }),
    [LOGOUT_SUCCESS]: state =>
      produce(state, draft => {
        draft.logged = false;
        draft.userInfo = {
          user_email: null,
          user_name: '',
          token: null,
        };
      }),
    [LOGOUT_FAILURE]: state =>
      produce(state, draft => {
        draft.error = {
          triggered: true,
          message: 'LOGOUT ERROR, PLEASE TRY AGAIN',
        };
      }),
  },
  initialState,
);
