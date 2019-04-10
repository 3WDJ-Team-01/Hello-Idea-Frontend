import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Wall.module.scss';

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

const Item = () => (
  <div className={styles.feed}>
    <div className={styles.header}>
      <div className={styles.img} />
      <div className={styles.activity}>
        <Link to={`/user/myspark02`}>
          <b>myspark02</b>
        </Link>{' '}
        created a repository myspark02/articles
      </div>
      <div className={styles.date}>2 days ago</div>
    </div>
    <div className={styles.detail} />
  </div>
);

export default Wall;
