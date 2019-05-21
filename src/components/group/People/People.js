/* eslint-disable react/no-array-index-key */
import React from 'react';
import User from 'components/base/Card/User';
import styles from './People.module.scss';

const People = ({ list }) => {
  return (
    <div className={styles.peopleList}>
      {list.map((item, i) => (
        <User key={i} value={item} />
      ))}
    </div>
  );
};

export default People;
