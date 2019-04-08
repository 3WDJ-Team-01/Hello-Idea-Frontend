import React from 'react';
import { Link } from 'react-router-dom';
import styles from './List.module.scss';

const List = ({ children }) => {
  return <div className={styles.list}>{children}</div>;
};

export default List;
