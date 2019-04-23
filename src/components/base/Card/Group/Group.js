import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import styles from './Group.module.scss';

const Group = ({ value }) => (
  <div className={styles.followerCard}>
    <div className={styles.followerImg}>img</div>
    <div className={styles.follower}>
      <div className={styles.name}>
        <Link to={`/group/${value.group_id}`}>{value.group_name}</Link>
      </div>

      <div className={styles.description}>{value.group_intro}</div>
    </div>
    <Link to={`/group/${value.group_id}`}>
      <MDBBtn outline color="primary">
        visit
      </MDBBtn>
    </Link>
  </div>
);

export default Group;
