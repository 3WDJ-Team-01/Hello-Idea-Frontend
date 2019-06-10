import React from 'react';
import { Link } from 'react-router-dom';
import styles from './User.module.scss';

const User = ({ value, disable = false }) => (
  <div className={styles.followerCard}>
    <div className={styles.followerImg}>
      <img src={value.user_img} alt={value.user_name} />
    </div>
    <div className={styles.follower}>
      <div className={styles.name}>
        {disable ? (
          value.user_name
        ) : (
          <Link to={`/user/${value.user_id}`}>{value.user_name}</Link>
        )}
      </div>

      <div className={styles.description}>{value.user_intro}</div>
    </div>
  </div>
);

export default User;
