import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Group.module.scss';

const Group = ({ value }) => (
  <div className={styles.followerCard}>
    <div className={styles.followerImg}>
      <img src={value.group_img} alt={value.group_name} />
    </div>
    <div className={styles.follower}>
      <div className={styles.name}>
        <Link to={`/group/${value.group_id}`}>{value.group_name}</Link>
      </div>

      <div className={styles.description}>{value.group_intro}</div>
    </div>
  </div>
);

export default Group;
