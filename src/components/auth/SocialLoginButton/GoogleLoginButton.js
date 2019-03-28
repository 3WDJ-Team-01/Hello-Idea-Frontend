import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import styles from './SocialLoginButton.module.scss';

const GoogleLoginButton = () => (
  <div className={`${styles.social_button} ${styles.google}`}>
    <FaGoogle />
    <span>Google Login...</span>
  </div>
);

export default GoogleLoginButton;
