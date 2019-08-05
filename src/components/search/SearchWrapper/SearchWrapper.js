import React from 'react';

import styles from './SearchWrapper.module.scss';

const SearchWrapper = ({ children }) => {
  return <div className={styles.searchWrapper}>{children}</div>;
};

export default SearchWrapper;
