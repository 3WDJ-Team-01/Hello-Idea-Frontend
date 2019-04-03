/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import styles from './Footer.module.scss';

const Footer = ({ repository }) => {
  return (
    <div className={styles.brainFooter}>
      <div className={styles.brainLeftFooter}>
        <MDBBtn color="deep-orange">Group Chat</MDBBtn>
      </div>
      <div className={styles.brainRightFooter}>
        <div>Username</div>
        <div>Username</div>
        <div>Username</div>
      </div>
    </div>
  );
};

export default Footer;
