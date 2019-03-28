import React from 'react';
import { Link } from 'react-router-dom';
import { MdLock } from 'react-icons/md';
import styles from './Header.module.scss';

const Header = ({ onLogout }) => (
  <div className={styles.header}>
    <Link to="/" className={styles.logo}>
      <img
        src="https://s3.ap-northeast-2.amazonaws.com/static.hello-idea.com/icons/global/logo.png"
        alt=""
      />
    </Link>
    <div className={styles.logout}>
      <MdLock onClick={onLogout} />
    </div>
  </div>
);

export default Header;
