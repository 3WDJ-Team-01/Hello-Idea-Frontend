/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthForm.module.scss';
import { FacebookLoginButton, GoogleLoginButton } from '../SocialLoginButton';

const LoginForm = ({
  user_email,
  password,
  error,
  handleChange,
  handleKeyPress,
  handleOnClick,
}) => (
  <div className={styles.form_wrapper}>
    <div className={styles.form}>
      <div className={styles.column}>
        <input
          type="email"
          name="user_email"
          placeholder="email"
          value={user_email}
          onChange={handleChange}
        />
      </div>
      <div className={styles.column}>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <span className={styles.error}>{error.message}</span>
      </div>
      <div className={styles.auth_button} onClick={handleOnClick}>
        LOGIN
      </div>
      <Link to="/auth/register" className={styles.description}>
        if you don't have an account...
      </Link>
    </div>
    <div className={styles.divider_wrapper}>
      <div className={styles.divider} />
      <div>or</div>
      <div className={styles.divider} />
    </div>
    <div className={styles.form}>
      <Link to="/*" className={styles.button}>
        <FacebookLoginButton />
      </Link>
      <Link to="/*" className={styles.button}>
        <GoogleLoginButton />
      </Link>
    </div>
  </div>
);

export default LoginForm;
