import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import mindmap from './mindmap';
import explore from './explore';
import recommend from './recommend';

export default combineReducers({
  auth,
  user,
  mindmap,
  explore,
  recommend,
});
