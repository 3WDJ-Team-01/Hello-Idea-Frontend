import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const NEWS_CRAWLING = 'explore/NEWS_CRAWLING';
const NEWS_CRAWLING_SUCCESS = 'explore/NEWS_CRAWLING_SUCCESS';
const NEWS_CRAWLING_FAILURE = 'explore/NEWS_CRAWLING_FAILURE';

export const newsCrawling = createAction(NEWS_CRAWLING);
export const newsCrawlingSuccess = createAction(NEWS_CRAWLING_SUCCESS);
export const newsCrawlingFailure = createAction(NEWS_CRAWLING_FAILURE);

export const crawlingRequest = () => dispatch => {
  dispatch(newsCrawling());
  return axios
    .get('/api/explore/news/')
    .then(res => {
      dispatch(newsCrawlingSuccess(res.data));
    })
    .catch(err => {
      dispatch(newsCrawlingFailure());
    });
};

const initialState = {
  state: '',
  error: '',
  news: [],
};

export default handleActions(
  {
    [NEWS_CRAWLING]: (state, action) =>
      produce(state, draft => {
        draft.state = 'pending';
      }),
    [NEWS_CRAWLING_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.state = 'success';
        draft.news = action.payload;
      }),
    [NEWS_CRAWLING_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.state = 'failure';
      }),
  },
  initialState,
);
