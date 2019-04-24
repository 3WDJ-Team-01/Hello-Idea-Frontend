/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const INITIALIZE = 'repository/INITIALIZE';
const GET = 'repository/GET';
const GET_SUCCESS = 'repository/GET_SUCCESS';
const GET_FAILURE = 'repository/GET_FAILURE';
const CREATE = 'repository/CREATE';
const CREATE_SUCCESS = 'repository/CREATE_SUCCESS';
const CREATE_FAILURE = 'repository/CREATE_FAILURE';
const UPDATE = 'repository/UPDATE';
const UPDATE_SUCCESS = 'repository/UPDATE_SUCCESS';
const UPDATE_FAILURE = 'repository/UPDATE_FAILURE';
const REMOVE = 'repository/REMOVE';
const REMOVE_SUCCESS = 'repository/REMOVE_SUCCESS';
const REMOVE_FAILURE = 'repository/REMOVE_FAILURE';

export const initialize = createAction(INITIALIZE);
export const get = createAction(GET);
export const getSuccess = createAction(GET_SUCCESS);
export const getFailure = createAction(GET_FAILURE);
export const create = createAction(CREATE);
export const createSuccess = createAction(CREATE_SUCCESS);
export const createFailure = createAction(CREATE_FAILURE);
export const update = createAction(UPDATE);
export const updateSuccess = createAction(UPDATE_SUCCESS);
export const updateFailure = createAction(UPDATE_FAILURE);
export const remove = createAction(REMOVE);
export const removeSuccess = createAction(REMOVE_SUCCESS);
export const removeFailure = createAction(REMOVE_FAILURE);

export const getRequest = project_id => dispatch => {
  dispatch(get());
  return axios
    .post('/api/project/detail/', { project_id })
    .then(res => {
      dispatch(getSuccess(res.data));
    })
    .catch(err => {
      if (err.response) dispatch(getFailure(err.response));
    });
};

export const createRequest = ({
  user_id,
  group_id,
  project_topic,
  project_intro,
  history,
}) => dispatch => {
  dispatch(create());
  return axios
    .post('/api/project/create/', {
      user_id,
      group_id,
      project_topic,
      project_intro,
    })
    .then(res => {
      axios.post('/api/project_category/create/', {
        project_id: res.data.project_id,
        result: res.data.result,
      });
      axios
        .post('/api/person_tendency/update/', {
          user_id,
          project_topic,
        })
        .then(() => {
          dispatch(createSuccess(res.data));
          if (group_id === 0)
            history.push(
              `/user/${user_id}/repositories/${res.data.project_id}/editor`,
            );
          else
            history.push(
              `/group/${group_id}/repositories/${res.data.project_id}/editor`,
            );
        });
    })
    .catch(err => {
      if (err.response) dispatch(createFailure(err.response));
    });
};

export const updateRequest = data => dispatch => {
  dispatch(update());
  return axios
    .post('/api/project/update/', data)
    .then(res => {
      dispatch(updateSuccess(res.data));
    })
    .catch(err => {
      if (err.response) dispatch(updateFailure(err.response));
    });
};

export const removeRequest = project_id => dispatch => {
  dispatch(remove());
  return axios
    .post('/api/project/delete/', { project_id })
    .then(res => {
      dispatch(removeSuccess(res.data));
    })
    .catch(err => {
      if (err.response) dispatch(removeFailure(err.response));
    });
};

const initialState = {
  state: '',
  author: '',
  info: {
    project_id: null,
    project_topic: null,
    project_intro: null,
    project_img: null,
  },
  category: {},
  similar: [],
  likes: [],
};

export default handleActions(
  {
    [INITIALIZE]: (state, action) =>
      produce(state, draft => {
        draft.state = '';
        draft.author = '';
        draft.info = {
          project_id: null,
          project_topic: null,
          project_intro: null,
          project_img: null,
        };
        draft.category = {};
        draft.similar = [];
        draft.likes = [];
      }),
    [GET]: (state, action) =>
      produce(state, draft => {
        draft.state = 'pending';
      }),
    [GET_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.state = 'success';
        draft.author = action.payload.creater_name;
        draft.info = {
          ...action.payload.project,
        };
        draft.category = {
          ...action.payload.project_category,
        };
        draft.similar = action.payload.similar_projects;
        draft.likes = action.payload.project_like;
      }),
    [GET_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state = 'failure';
        draft.author = '';
        draft.info = null;
        draft.category = null;
        draft.similar = null;
        draft.likes = null;
      }),
    [CREATE]: (state, action) =>
      produce(state, draft => {
        draft.state = 'pending';
      }),
    [CREATE_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.state = 'success';
        draft.info = {
          project_id: action.payload.project_id,
        };
      }),
    [CREATE_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state = 'failure';
      }),
    [UPDATE]: (state, action) =>
      produce(state, draft => {
        draft.state = 'pending';
      }),
    [UPDATE_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.state = 'success';
      }),
    [UPDATE_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state = 'failure';
      }),
    [REMOVE]: (state, action) =>
      produce(state, draft => {
        draft.state = 'pending';
      }),
    [REMOVE_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.state = 'success';
      }),
    [REMOVE_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state = 'failure';
      }),
  },
  initialState,
);
