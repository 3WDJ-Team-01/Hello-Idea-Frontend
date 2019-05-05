/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const INITIALIZE = 'user/INITIALIZE';
const USER = 'user/USER';
const USER_SUCCESS = 'user/USER_SUCCESS';
const USER_FAILURE = 'user/USER_FAILURE';
const TARGET_GROUPS = 'user/TARGET_GROUPS';
const TARGET_GROUPS_SUCCESS = 'user/TARGET_GROUPS_SUCCESS';
const TARGET_GROUPS_FAILURE = 'user/TARGET_GROUPS_FAILURE';
const REPOSITORIES = 'user/REPOSITORIES';
const REPOSITORIES_SUCCESS = 'user/REPOSITORIES_SUCCESS';
const REPOSITORIES_FAILURE = 'user/REPOSITORIES_FAILURE';
const FOLLOWER = 'user/FOLLOWER';
const FOLLOWER_SUCCESS = 'user/FOLLOWER_SUCCESS';
const FOLLOWER_FAILURE = 'user/FOLLOWER_FAILURE';

export const initialize = createAction(INITIALIZE);
export const user = createAction(USER);
export const userSuccess = createAction(USER_SUCCESS);
export const userFailure = createAction(USER_FAILURE);
export const targetGroups = createAction(TARGET_GROUPS);
export const targetGroupsSuccess = createAction(TARGET_GROUPS_SUCCESS);
export const targetGroupsFailure = createAction(TARGET_GROUPS_FAILURE);
export const repositories = createAction(REPOSITORIES);
export const repositoriesSuccess = createAction(REPOSITORIES_SUCCESS);
export const repositoriesFailure = createAction(REPOSITORIES_FAILURE);
export const follower = createAction(FOLLOWER);
export const followerSuccess = createAction(FOLLOWER_SUCCESS);
export const followerFailure = createAction(FOLLOWER_FAILURE);

export const userRequest = user_id => dispatch => {
  dispatch(user());
  return axios
    .post('/api/page/index/', { user_id })
    .then(res => {
      dispatch(userSuccess(res.data));
    })
    .catch(err => {
      if (err.response) dispatch(userFailure(err.response));
    });
};
export const targetGroupsRequest = user_id => dispatch => {
  dispatch(targetGroups());
  return axios
    .post('/api/main/group/', { user_id })
    .then(res => {
      dispatch(targetGroupsSuccess(res.data));
    })
    .catch(err => {
      if (err.response) dispatch(targetGroupsFailure(err.response));
    });
};
export const repositoriesRequest = (user_id, group_id) => dispatch => {
  dispatch(repositories());
  return axios
    .post('/api/main/project/', { user_id, group_id })
    .then(res => {
      dispatch(repositoriesSuccess(res.data));
    })
    .catch(err => {
      if (err.response) dispatch(repositoriesFailure(err.response));
    });
};

export const followerRequest = user_id => dispatch => {
  dispatch(follower());
  return axios
    .post('/api/follow/', { user_id })
    .then(res => {
      dispatch(followerSuccess(res.data));
    })
    .catch(err => {
      if (err.response) dispatch(followerFailure(err.response));
    });
};

const initialState = {
  state: {
    info: '',
    group: '',
    repositories: '',
    follower: '',
  },
  info: {
    User_detail: {
      user_name: '',
      user_id: 0,
      user_email: '',
      user_img: '',
      user_bgimg: '#ECF0F1',
    },
    User_tendency: {
      it: 0,
      sport: 0,
      society: 0,
      politics: 0,
      life: 0,
      economy: 0,
    },
    User_feed: {},
    User_log: {},
  },
  groups: [
    // {
    //   group_id: 0,
    //   group_name: '',
    //   group_intro: '',
    //   group_bgimg: '',
    //   group_img: '',
    // },
  ],
  repositories: {
    all: [],
    Society: [],
    Sport: [],
    It: [],
    Politics: [],
    Economy: [],
    Life: [],
  },
  follower: [],
  following: [],
};

export default handleActions(
  {
    [INITIALIZE]: state =>
      produce(state, draft => {
        draft.state = {
          info: '',
          group: '',
          repositories: '',
          follower: '',
        };
        draft.info = {
          User_detail: {
            user_name: '',
            user_id: 0,
            user_email: '',
            user_img: '',
            user_bgimg: '#ECF0F1',
          },
          User_tendency: {
            it: 0,
            sport: 0,
            society: 0,
            politics: 0,
            life: 0,
            economy: 0,
          },
          User_feed: {},
          User_log: {},
        };
        draft.groups = [];
        draft.repositories = {
          all: [],
          Society: [],
          Sport: [],
          It: [],
          Politics: [],
          Economy: [],
          Life: [],
        };
        draft.follower = [];
        draft.following = [];
      }),
    [USER]: (state, action) =>
      produce(state, draft => {
        draft.state.info = 'pending';
      }),
    [USER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.state.info = 'success';
        draft.info = action.payload;
      }),
    [USER_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state.info = 'failure';
      }),
    [TARGET_GROUPS]: (state, action) =>
      produce(state, draft => {
        draft.state.group = 'pending';
      }),
    [TARGET_GROUPS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.state.group = 'success';
        draft.groups = action.payload;
      }),
    [TARGET_GROUPS_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state.group = 'failure';
      }),
    [REPOSITORIES]: (state, action) =>
      produce(state, draft => {
        draft.state.repositories = 'pending';
      }),
    [REPOSITORIES_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.state.repositories = 'success';
        draft.repositories = {
          ...action.payload.category_project,
          all: action.payload.all_project,
        };
      }),
    [REPOSITORIES_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state.repositories = 'failure';
      }),
    [FOLLOWER]: (state, action) =>
      produce(state, draft => {
        draft.state.follower = 'pending';
      }),
    [FOLLOWER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.state.follower = 'success';
        draft.follower = action.payload.follower;
        draft.following = action.payload.following;
      }),
    [FOLLOWER_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state.follower = 'failure';
        draft.follower = [];
        draft.following = [];
      }),
  },
  initialState,
);
