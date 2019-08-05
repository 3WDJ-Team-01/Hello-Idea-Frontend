/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBInput, MDBBtn } from 'mdbreact';
import { FormattedMessage } from 'react-intl';
import styles from './AuthForm.module.scss';

const RegisterForm = ({
  email,
  password,
  user_name,
  user_birth_YYYY,
  user_birth_MM,
  user_birth_DD,
  changeInput,
  handleRegister,
  error,
}) => (
  <div className={styles.form_wrapper}>
    <div className={styles.form}>
      <div className={styles.column}>
        <FormattedMessage id="auth.email">
          {emailMsg => (
            <MDBInput
              label={emailMsg}
              size="lg"
              outline
              type="email"
              name="user_email"
              value={email}
              onChange={changeInput}
              error={error.message}
            />
          )}
        </FormattedMessage>
      </div>
      <div className={styles.column}>
        <FormattedMessage id="auth.password">
          {pw => (
            <MDBInput
              label={pw}
              size="lg"
              outline
              type="password"
              name="password"
              value={password}
              onChange={changeInput}
              error={error.message}
            />
          )}
        </FormattedMessage>
      </div>
      <div className={styles.column}>
        <FormattedMessage id="auth.name">
          {name => (
            <MDBInput
              label={name}
              size="lg"
              outline
              type="text"
              name="user_name"
              value={user_name}
              onChange={changeInput}
              error={error.message}
            />
          )}
        </FormattedMessage>
      </div>
      <div className={styles.column}>
        <div className={styles.row}>
          <FormattedMessage id="auth.YYYY">
            {yyyy => (
              <MDBInput
                label={yyyy}
                size="lg"
                outline
                className={styles.input_row}
                type="number"
                name="user_birth_YYYY"
                placeholder="Year"
                value={user_birth_YYYY}
                onChange={changeInput}
                error={error.message}
              />
            )}
          </FormattedMessage>
          <FormattedMessage id="auth.MM">
            {mm => (
              <MDBInput
                label={mm}
                size="lg"
                outline
                className={styles.input_row}
                type="number"
                name="user_birth_MM"
                placeholder="Month"
                value={user_birth_MM}
                onChange={changeInput}
                error={error.message}
              />
            )}
          </FormattedMessage>
          <FormattedMessage id="auth.DD">
            {dd => (
              <MDBInput
                label={dd}
                size="lg"
                outline
                className={styles.input_row}
                type="number"
                name="user_birth_DD"
                placeholder="Day"
                value={user_birth_DD}
                onChange={changeInput}
                error={error.message}
              />
            )}
          </FormattedMessage>
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.row}>
          <label className={styles.gender}>
            <input
              type="radio"
              name="user_gender"
              value="male"
              onChange={changeInput}
            />
            <div className={styles.button_row}>
              <FormattedMessage id="auth.male" />
            </div>
          </label>
          <label className={styles.gender}>
            <input
              type="radio"
              name="user_gender"
              value="female"
              onChange={changeInput}
            />
            <div className={styles.button_row}>
              <FormattedMessage id="auth.female" />
            </div>
          </label>
        </div>
      </div>
      <MDBBtn size="lg" color="primary" onClick={handleRegister}>
        <FormattedMessage id="auth.signup" />
      </MDBBtn>
      <Link to="/auth/login" className={styles.description}>
        <FormattedMessage id="auth.isAccount" />
      </Link>
    </div>
  </div>
);

export default RegisterForm;
