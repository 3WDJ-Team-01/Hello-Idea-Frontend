import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ExploreWrapper.module.scss';

const ExploreWrapper = ({ children }) => {
  return (
    <div className={styles.explore}>
      <div className={styles.squareList}>
        <div className={styles.squareFirst} />
        <div className={styles.squareSecond} />
        <div className={styles.squareThird} />
      </div>
      {children}
    </div>
  );
};

export default ExploreWrapper;
