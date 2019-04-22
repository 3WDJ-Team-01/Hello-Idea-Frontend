import React from 'react';
import { Link } from 'react-router-dom';
import styles from './List.module.scss';

const List = ({ title, children }) => {
  return (
    <div className={styles.list}>
      <h4>{title}</h4>
      <div>{children}</div>
    </div>
  );
};

export default List;
