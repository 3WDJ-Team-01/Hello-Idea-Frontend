import React from 'react';
import { MDBIcon } from 'mdbreact';
import styles from './SocialLoginButton.module.scss';

const FacebookLoginButton = () => (
  <div className={`${styles.social_button} ${styles.facebook}`}>
    <MDBIcon fab icon="facebook-f" />
    <span>Facebook Login...</span>
  </div>
);

export default FacebookLoginButton;
