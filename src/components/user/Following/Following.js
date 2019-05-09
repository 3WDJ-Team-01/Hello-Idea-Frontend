/* eslint-disable react/no-array-index-key */
import React from 'react';
import User from 'components/base/Card/User';
import styles from './Following.module.scss';

const Following = ({ list, loggedUserFollowings }) => {
  return (
    <div className={styles.followerList}>
      {list.map((item, i) => (
        <User key={i} value={item} />
      ))}
    </div>
  );
};

export default Following;
