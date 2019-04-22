import React from 'react';
import User from 'components/base/Card/User';
import styles from './Following.module.scss';

const Following = ({ list }) => {
  return (
    <div className={styles.followerList}>
      {list.map((item, i) => (
        <User value={item} />
      ))}
    </div>
  );
};

export default Following;
