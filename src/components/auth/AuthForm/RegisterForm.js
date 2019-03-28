/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthForm.module.scss';

const RegisterForm = ({
  email,
  password,
  user_name,
  user_birth_YYYY,
  user_birth_MM,
  user_birth_DD,
  handleChange,
  handleOnClick,
  error,
}) => (
  <div className={styles.form_wrapper}>
    <div className={styles.form}>
      <div className={styles.column}>
        <input
          className={styles.input_column}
          type="email"
          name="user_email"
          placeholder="email"
          value={email}
          onChange={handleChange}
        />
        <span className={styles.error}>{error.message}</span>
      </div>
      <div className={styles.column}>
        <input
          className={styles.input_column}
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={handleChange}
        />
      </div>
      <div className={styles.column}>
        <input
          className={styles.input_column}
          type="text"
          name="user_name"
          placeholder="name"
          value={user_name}
          onChange={handleChange}
        />
      </div>
      <div className={styles.column}>
        <div className={styles.row}>
          <input
            className={styles.input_row}
            type="number"
            name="user_birth_YYYY"
            placeholder="Year"
            value={user_birth_YYYY}
            onChange={handleChange}
          />
          <input
            className={styles.input_row}
            type="number"
            name="user_birth_MM"
            placeholder="Month"
            value={user_birth_MM}
            onChange={handleChange}
          />
          <input
            className={styles.input_row}
            type="number"
            name="user_birth_DD"
            placeholder="Day"
            value={user_birth_DD}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.row}>
          <label>
            <input
              type="radio"
              name="user_gender"
              value="male"
              onChange={handleChange}
            />
            <div className={styles.button_row}>남성</div>
          </label>
          <label>
            <input
              type="radio"
              name="user_gender"
              value="female"
              onChange={handleChange}
            />
            <div className={styles.button_row}>여성</div>
          </label>
        </div>
      </div>
      <div className={styles.auth_button} onClick={handleOnClick}>
        REGISTER
      </div>
      <Link to="/auth/login" className={styles.description}>
        if you already have account...
      </Link>
    </div>
  </div>
);

export default RegisterForm;
