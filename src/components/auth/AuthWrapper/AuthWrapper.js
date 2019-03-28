import React from 'react';
import styles from './AuthWrapper.module.scss';
import LoginForm from '../AuthForm/LoginForm';
import RegisterForm from '../AuthForm/RegisterForm';

const AuthWrapper = ({
  kind,
  user_email,
  password,
  user_name,
  user_birth_YYYY,
  user_birth_MM,
  user_birth_DD,
  onChangeInput,
  onLogin,
  onRegister,
  error,
}) => {
  const handleChange = e => {
    const { name, value } = e.target;
    onChangeInput({ name, value });
  };

  const handleOnClick = e => {
    if (kind === 'login') onLogin();
    else if (kind === 'register') onRegister();
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') onLogin();
  };

  return (
    <div className={styles.auth_wrapper}>
      <div className={styles.title}>Hello Idea !</div>
      {kind === 'login' ? (
        <LoginForm
          user_email={user_email}
          password={password}
          handleChange={handleChange}
          handleKeyPress={handleKeyPress}
          handleOnClick={handleOnClick}
          error={error}
        />
      ) : (
        <RegisterForm
          user_email={user_email}
          password={password}
          user_name={user_name}
          user_birth_YYYY={user_birth_YYYY}
          user_birth_MM={user_birth_MM}
          user_birth_DD={user_birth_DD}
          handleChange={handleChange}
          handleOnClick={handleOnClick}
          error={error}
        />
      )}
    </div>
  );
};

export default AuthWrapper;
