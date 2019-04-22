/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

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
  state: '',
  info: {},
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
    [USER]: (state, action) =>
      produce(state, draft => {
        draft.state = 'pending';
      }),
    [USER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.state = 'success';
        draft.info = action.payload;
      }),
    [USER_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state = 'failure';
      }),
    [TARGET_GROUPS]: (state, action) =>
      produce(state, draft => {
        draft.state = 'pending';
      }),
    [TARGET_GROUPS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.state = 'success';
        draft.groups = action.payload;
      }),
    [TARGET_GROUPS_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state = 'failure';
      }),
    [REPOSITORIES]: (state, action) =>
      produce(state, draft => {
        draft.state = 'pending';
      }),
    [REPOSITORIES_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const all = [];
        for (const category in action.payload) {
          for (const repository in action.payload[category])
            all.push(action.payload[category][repository]);
        }
        draft.state = 'success';
        draft.repositories = {
          ...action.payload,
          all,
        };
      }),
    [REPOSITORIES_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state = 'failure';
      }),
    [FOLLOWER]: (state, action) =>
      produce(state, draft => {
        draft.state = 'pending';
      }),
    [FOLLOWER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.state = 'success';
        draft.follower = action.payload.follower;
        draft.following = action.payload.following;
      }),
    [FOLLOWER_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state = 'failure';
        draft.follower = [];
        draft.following = [];
      }),
  },
  initialState,
);
