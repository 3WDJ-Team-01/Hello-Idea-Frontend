import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import AuthWrapper from '../components/auth/AuthWrapper';
import * as authActions from '../store/modules/auth';

export class AuthContainer extends Component {
  componentDidMount() {
    const { history, kind } = this.props;
    const validate = /(login|register)/;

    if (!validate.test(kind)) {
      history.push('/');
    } else {
      this.initialize();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { history, kind, logged, userInfo } = this.props;
    if (prevProps.kind !== kind) {
      this.initialize();
    }

    if (prevProps.logged !== logged && logged) {
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          user_email: userInfo.user_email,
          user_name: userInfo.user_name,
          token: userInfo.token,
        }),
      );
      history.push('/');
    }
  }

  initialize = () => {
    const { AuthActions } = this.props;
    AuthActions.initializeError();
    AuthActions.initializeInput();
  };

  handleChangeInput = ({ name, value, id }) => {
    const { AuthActions } = this.props;
    AuthActions.changeInput({ name, value });
  };

  handleLogin = () => {
    const { form, AuthActions } = this.props;
    const { user_email, password } = form;
    AuthActions.loginRequest({ user_email, password });
  };

  handleRegister = () => {
    const { form, AuthActions } = this.props;
    const {
      user_email,
      password,
      user_name,
      user_birth_YYYY,
      user_birth_MM,
      user_birth_DD,
      user_gender,
    } = form;
    AuthActions.registerRequest({
      user_email,
      password,
      user_name,
      user_gender,
      user_birth:
        `${parseInt(user_birth_YYYY, 10)}-` +
        `${parseInt(user_birth_MM, 10)}-` +
        `${parseInt(user_birth_DD, 10)}`,
    });
  };

  render() {
    const { kind, form, error } = this.props;
    const { handleChangeInput, handleLogin, handleRegister } = this;

    return (
      <AuthWrapper
        kind={kind}
        user_email={form.user_email}
        password={form.password}
        user_name={form.user_name}
        user_birth_YYYY={form.user_birth_YYYY}
        user_birth_MM={form.user_birth_MM}
        user_birth_DD={form.user_birth_DD}
        onChangeInput={handleChangeInput}
        onLogin={handleLogin}
        onRegister={handleRegister}
        error={error}
      />
    );
  }
}

const mapStateToProps = state => ({
  form: state.auth.form,
  error: state.auth.error,
  logged: state.auth.logged,
  userInfo: state.auth.userInfo,
});

const mapDispatchToProps = dispatch => ({
  AuthActions: bindActionCreators(authActions, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AuthContainer),
);
