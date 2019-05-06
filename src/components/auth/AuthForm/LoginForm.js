/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBInput, MDBBtn } from 'mdbreact';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'components/auth/SocialLoginButton';
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
            label="이메일"
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
            label="비밀번호"
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
          로그인
        </MDBBtn>
        <Link to="/auth/register" className={styles.description}>
          아직 계정이 없으신가요?
        </Link>
      </div>
      {/* <div className={styles.divider_wrapper}>
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
      </div> */}
    </div>
  );
};

export default LoginForm;
