import React from 'react';
import { Link, Route } from 'react-router-dom';
import styles from './UserWrapper.module.scss';

const UserWrapper = ({
  user,
  url,
  Overview,
  Repositories,
  Followers,
  Followings,
  children,
}) => {
  return (
    <div className={styles.userWrapper}>
      <Route path={`${url}`} exact component={Overview} />
      <Route path={`${url}/Repositories`} component={Repositories} />
      <Route path={`${url}/Followers`} component={Followers} />
      <Route path={`${url}/Followings`} component={Followings} />
    </div>
  );
};

export default UserWrapper;
