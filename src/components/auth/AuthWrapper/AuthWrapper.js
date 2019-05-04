import React from 'react';
import LoginForm from 'components/auth/AuthForm/LoginForm';
import RegisterForm from 'components/auth/AuthForm/RegisterForm';
import styles from './AuthWrapper.module.scss';

const AuthWrapper = ({ head, children }) => (
  <div className={styles.auth_wrapper}>
    <div className={styles.title}>{head}</div>
    {children}
  </div>
);

export default AuthWrapper;
