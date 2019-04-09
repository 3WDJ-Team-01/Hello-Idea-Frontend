import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const WITH_TENDENCY = 'recommend/WITH_TENDENCY';
const WITH_TENDENCY_SUCCESS = 'recommend/WITH_TENDENCY_SUCCESS';
const WITH_TENDENCY_FAILURE = 'recommend/WITH_TENDENCY_FAILURE';
const WITH_POPULAR = 'recommend/WITH_POPULAR';
const WITH_POPULAR_SUCCESS = 'recommend/WITH_POPULAR_SUCCESS';
const WITH_POPULAR_FAILURE = 'recommend/WITH_POPULAR_FAILURE';

export const withTendency = createAction(WITH_TENDENCY);
export const withTendencySuccess = createAction(WITH_TENDENCY_SUCCESS);
export const withTendencyFailure = createAction(WITH_TENDENCY_FAILURE);
export const withPopular = createAction(WITH_POPULAR);
export const withPopularSuccess = createAction(WITH_POPULAR_SUCCESS);
export const withPopularFailure = createAction(WITH_POPULAR_FAILURE);

export const withTendencyRequest = user_id => dispatch => {
  dispatch(withTendency());
  return axios
    .post('/api/main/project_recommend/', { user_id })
    .then(res => {
      dispatch(withTendencySuccess(res.data));
    })
    .catch(err => {
      if (err.response) dispatch(withTendencyFailure(err.response));
    });
};
export const withPopularRequest = () => dispatch => {
  dispatch(withPopular());
  return axios
    .get('/api/explore/popular/')
    .then(res => {
      dispatch(withPopularSuccess(res.data));
    })
    .catch(err => {
      if (err.response) dispatch(withPopularFailure(err.response));
    });
};

const initialState = {
  state: 'pending',
  tendency: [
    {
      project_topic: '',
      project_img: '',
    },
  ],
  popular: [
    {
      project_id: 0,
      project_topic: '',
      project_img: '',
      project_intro: '',
    },
  ],
};

export default handleActions(
  {
    [WITH_TENDENCY]: (state, action) =>
      produce(state, draft => {
        draft.state = 'pending';
      }),
    [WITH_TENDENCY_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.state = 'success';
        draft.tendency = action.payload;
      }),
    [WITH_TENDENCY_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state = 'failure';
      }),
    [WITH_POPULAR]: (state, action) =>
      produce(state, draft => {
        draft.state = 'pending';
      }),
    [WITH_POPULAR_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.state = 'success';
        draft.popular = action.payload;
      }),
    [WITH_POPULAR_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state = 'failure';
      }),
  },
  initialState,
);
