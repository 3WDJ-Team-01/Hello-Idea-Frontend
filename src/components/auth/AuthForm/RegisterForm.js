/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBInput, MDBBtn } from 'mdbreact';
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
        <MDBInput
          label="이메일"
          size="lg"
          outline
          type="email"
          name="user_email"
          value={email}
          onChange={handleChange}
          error={error.message}
        />
      </div>
      <div className={styles.column}>
        <MDBInput
          label="비밀번호"
          size="lg"
          outline
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          error={error.message}
        />
      </div>
      <div className={styles.column}>
        <MDBInput
          label="이름"
          size="lg"
          outline
          type="text"
          name="user_name"
          value={user_name}
          onChange={handleChange}
          error={error.message}
        />
      </div>
      <div className={styles.column}>
        <div className={styles.row}>
          <MDBInput
            label="년"
            size="lg"
            outline
            className={styles.input_row}
            type="number"
            name="user_birth_YYYY"
            placeholder="Year"
            value={user_birth_YYYY}
            onChange={handleChange}
            error={error.message}
          />
          <MDBInput
            label="월"
            size="lg"
            outline
            className={styles.input_row}
            type="number"
            name="user_birth_MM"
            placeholder="Month"
            value={user_birth_MM}
            onChange={handleChange}
            error={error.message}
          />
          <MDBInput
            label="일"
            size="lg"
            outline
            className={styles.input_row}
            type="number"
            name="user_birth_DD"
            placeholder="Day"
            value={user_birth_DD}
            onChange={handleChange}
            error={error.message}
          />
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.row}>
          <label className={styles.gender}>
            <input
              type="radio"
              name="user_gender"
              value="male"
              onChange={handleChange}
            />
            <div className={styles.button_row}>남성</div>
          </label>
          <label className={styles.gender}>
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
      <MDBBtn size="lg" color="primary" onClick={handleOnClick}>
        회원가입
      </MDBBtn>
      <Link to="/auth/login" className={styles.description}>
        이미 계정이 있으신가요?
      </Link>
    </div>
  </div>
);

export default RegisterForm;
