/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBInput, MDBBtn } from 'mdbreact';
import { ja } from 'data/locale';
import styles from './AuthForm.module.scss';

const LoginForm = ({
  user_email,
  password,
  error,
  changeInput,
  handleLogin,
}) => {
  const handleKeyPress = e => {
    if (e.key === 'Enter') handleLogin();
  };
  return (
    <div className={styles.form_wrapper}>
      <div className={styles.form}>
        <div className={styles.column}>
          <MDBInput
            label={ja.auth.email}
            outline
            type="email"
            name="user_email"
            size="lg"
            value={user_email}
            onChange={changeInput}
            error={error.message}
          />
        </div>
        <div className={styles.column}>
          <MDBInput
            label={ja.auth.password}
            outline
            type="password"
            name="password"
            size="lg"
            value={password}
            onChange={changeInput}
            onKeyPress={handleKeyPress}
            error={error.message}
          />
        </div>
        <MDBBtn size="lg" color="primary" onClick={handleLogin}>
          {ja.auth.signin}
        </MDBBtn>
        <Link to="/auth/register" className={styles.description}>
          {ja.auth.notAccount}
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
