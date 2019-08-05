import React from 'react';

import styles from './RepositoryWrapper.module.scss';

const RepositoryWrapper = ({ children }) => {
  return <div className={styles.userWrapper}>{children}</div>;
};

export default RepositoryWrapper;
