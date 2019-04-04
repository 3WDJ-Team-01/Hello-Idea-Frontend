import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Discover.module.scss';

const Item = () => (
  <div className={styles.repo}>
    <div className={styles.path}>
      <Link to="/*">USERNAME/repository</Link>
    </div>
    <div className={styles.desc}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean libero
      nulla, commodo at diam sit amet, ultrices venenatis ante.
    </div>
    <div className={styles.properties}>
      <span>IT</span>
      <span>3000 likes</span>
    </div>
  </div>
);

const Discover = () => {
  return (
    <div className={styles.discover}>
      <span>이런 주제의 생각은 어떠세요?</span>
      <div className={styles.repoList}>
        <Item />
        <Item />
        <Item />
      </div>
      <Link to="/explore">모두 보기</Link>
    </div>
  );
};

export default Discover;
