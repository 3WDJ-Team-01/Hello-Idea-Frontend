import { combineReducers } from 'redux';
import auth from './auth';
import mindmap from './mindmap';
import explore from './explore';

export default combineReducers({
  auth,
  mindmap,
  explore,
});
