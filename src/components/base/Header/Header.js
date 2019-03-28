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

    <div className={styles.account} style={{ color: 'white' }}>
      <details>
        <summary>username_1</summary>
        <div>
          <p>username_2</p>
          <p>username_3</p>
          <p>username_4</p>
        </div>
      </details>
    </div>

    <div className={styles.logout}>
      <MdLock onClick={onLogout} />
    </div>
  </div>
);

export default Header;
