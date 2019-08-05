import React from 'react';

import styles from './AlertWrapper.module.scss';

const AlertWrapper = ({ children }) => {
  return <div className={styles.alertWrapper}>{children}</div>;
};

export default AlertWrapper;
