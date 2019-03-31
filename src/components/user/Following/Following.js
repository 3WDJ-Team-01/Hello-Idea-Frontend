import React from 'react';
import { Link, Route } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import styles from './Following.module.scss';

const UserCard = () => (
  <div className={styles.followerCard}>
    <div className={styles.followerImg}>img</div>
    <div className={styles.follower}>
      <div className={styles.name}>userName</div>

      <div className={styles.description}>
        when an unknown printer took a galley of type and scrambled it.
      </div>
    </div>
    <MDBBtn outline color="primary">
      follow
    </MDBBtn>
  </div>
);

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
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
    </div>
  );
};

export default Following;
