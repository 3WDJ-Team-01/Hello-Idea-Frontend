import { combineReducers } from 'redux';
import auth from './auth';

// mindmap modules
import mindmap from './mindmap';

export default combineReducers({
  auth,
  mindmap,
});
