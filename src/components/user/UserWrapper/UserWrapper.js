import React from 'react';

import styles from './UserWrapper.module.scss';

const UserWrapper = ({ children }) => {
  return <div className={styles.userWrapper}>{children}</div>;
};

export default UserWrapper;
