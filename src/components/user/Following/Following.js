import React from 'react';
import { MDBBtn } from 'mdbreact';
import User from 'components/base/Card/User';
import styles from './Following.module.scss';

const Following = ({
  user,
  url,
  Overview,
  Repositories,
  Followers,
  children,
}) => {
  return (
    <div className={styles.followerList}>
      <User />
      <User />
      <User />
      <User />
      <User />
    </div>
  );
};

export default Following;
