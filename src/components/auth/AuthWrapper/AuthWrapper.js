import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from 'components/auth/AuthForm/LoginForm';
import RegisterForm from 'components/auth/AuthForm/RegisterForm';
import styles from './AuthWrapper.module.scss';

const AuthWrapper = ({ head, children }) => (
  <div className={styles.auth_wrapper}>
    <Link to="/">
      <div className={styles.title}>{head}</div>
    </Link>
    {children}
  </div>
);

export default AuthWrapper;
