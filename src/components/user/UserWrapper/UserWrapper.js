import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './UserWrapper.module.scss';

const UserWrapper = ({
  user,
  url,
  Overview,
  Repositories,
  Following,
  Modify,
  children,
}) => {
  return (
    <div className={styles.userWrapper}>
      <Switch>
        <Route path="/:user/repositories" component={Repositories} />
        <Route path="/:user/followers" component={Following} />
        <Route path="/:user/followings" component={Following} />
        <Route path="/:user/modify" component={Modify} />
        <Route path="/:user" exact component={Overview} />
      </Switch>
    </div>
  );
};

export default UserWrapper;
