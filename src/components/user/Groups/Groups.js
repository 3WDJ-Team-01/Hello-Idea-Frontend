import React from 'react';
import Group from 'components/base/Card/Group';
import styles from './Groups.module.scss';

const Groups = ({ list }) => {
  return (
    <div className={styles.followerList}>
      {list.map((item, i) => (
        <Group value={item} />
      ))}
    </div>
  );
};

export default Groups;
