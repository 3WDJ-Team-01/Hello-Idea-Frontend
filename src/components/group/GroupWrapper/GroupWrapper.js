import React from 'react';

import styles from './GroupWrapper.module.scss';

const GroupWrapper = ({ children }) => {
  return <div className={styles.groupWrapper}>{children}</div>;
};

export default GroupWrapper;
