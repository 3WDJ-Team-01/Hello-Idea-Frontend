import React from 'react';
import styles from './Wall.module.scss';

const Wall = ({ children }) => {
  return <div className={styles.feedlist}>{children}</div>;
};

export default Wall;
