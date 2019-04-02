/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link, Route } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import styles from './Footer.module.scss';

const Footer = ({ repository }) => {
  return (
    <>
      <div className={styles.brainFooter}>
        <ul className={styles.brainFootUl}>
          <li>
            <Link to="/*" className={styles.brainFootLink}>
              그룹채팅
            </Link>
          </li>

          <li>
            <Link to="/*" className={styles.brainFootLink}>
              채팅창1
            </Link>
          </li>

          <li>
            <Link to="/*" className={styles.brainFootLink}>
              채팅창2
            </Link>
          </li>

          <li>
            <Link to="/*" className={styles.brainFootLink}>
              유저(드롭다운)
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Footer;
