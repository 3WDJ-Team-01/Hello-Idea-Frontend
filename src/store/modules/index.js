import { combineReducers } from 'redux';
import auth from './auth';

// mindmap modules
import pointer from './pointer';
import canvas from './canvas';
import mindmap from './mindmap';

export default combineReducers({
  auth,
  pointer,
  canvas,
  mindmap,
});
