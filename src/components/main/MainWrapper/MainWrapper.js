import React from 'react';
import styles from './MainWrapper.module.scss';

const MainWrapper = ({ children }) => {
  return <div className={styles.main_wrapper}>{children}</div>;
};

export default MainWrapper;
