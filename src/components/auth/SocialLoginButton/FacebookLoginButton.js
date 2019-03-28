import React from 'react';
import { FaFacebookSquare } from 'react-icons/fa';
import styles from './SocialLoginButton.module.scss';

const FacebookLoginButton = () => (
  <div className={`${styles.social_button} ${styles.facebook}`}>
    <FaFacebookSquare />
    <span>Facebook Login...</span>
  </div>
);

export default FacebookLoginButton;
