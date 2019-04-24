import React from 'react';
import User from 'components/base/Card/User';
import styles from './People.module.scss';

const People = ({ list }) => {
  return (
    <div className={styles.peopleList}>
      {list.map((item, i) => (
        <User value={item} />
      ))}
    </div>
  );
};

export default People;
