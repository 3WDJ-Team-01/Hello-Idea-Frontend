import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Wall.module.scss';

const Item = () => (
  <div className={styles.feed}>
    <div className={styles.header}>
      <div className={styles.img} />
      <div className={styles.activity}>
        myspark02 created a repository myspark02/articles
      </div>
      <div className={styles.date}>2 days ago</div>
    </div>
    <div className={styles.detail} />
  </div>
);

const Wall = () => {
  return (
    <div className={styles.feedlist}>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  );
};

export default Wall;
