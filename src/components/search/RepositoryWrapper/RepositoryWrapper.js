import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import styles from './RepositoryWrapper.module.scss';

const RepositoryWrapper = ({ user, url, Overview, repository, Setting }) => {
  return (
    <div className={styles.userWrapper}>
      <Switch>
        <Route
          path="/:user/repositories/:repository/settings"
          component={Setting}
        />
        <Route path="/:user/repositories/:repository">
          <Overview repository={repository} />
        </Route>
      </Switch>
    </div>
  );
};

export default RepositoryWrapper;
