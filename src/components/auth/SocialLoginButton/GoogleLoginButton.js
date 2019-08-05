import React from 'react';
import { MDBIcon } from 'mdbreact';
import styles from './SocialLoginButton.module.scss';

const GoogleLoginButton = () => (
  <div className={`${styles.social_button} ${styles.google}`}>
    <MDBIcon fab icon="google-plus-g" />
    <span>Google Login...</span>
  </div>
);

export default GoogleLoginButton;
