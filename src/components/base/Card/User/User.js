import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import styles from './User.module.scss';

const User = () => (
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

export default User;