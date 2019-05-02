import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import mindmap from './mindmap';
import explore from './explore';
import recommend from './recommend';
import repository from './repository';
import notification from './notification';

export default combineReducers({
  auth,
  user,
  mindmap,
  explore,
  recommend,
  repository,
  notification,
});
