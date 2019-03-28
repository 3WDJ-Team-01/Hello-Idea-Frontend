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
    console.log(logged);

    if (prevProps.logged !== logged && logged) {
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          id: userInfo.id,
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
    const { AuthActions } = this.props;
    const { user_email, password } = this.props;
    AuthActions.loginRequest({ user_email, password });
  };

  handleRegister = () => {
    const { AuthActions } = this.props;
    const {
      user_email,
      password,
      user_name,
      user_birth_YYYY,
      user_birth_MM,
      user_birth_DD,
      user_gender,
    } = this.props;
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
    const {
      kind,
      user_email,
      password,
      user_name,
      user_birth_YYYY,
      user_birth_MM,
      user_birth_DD,
      user_gender,
      error,
    } = this.props;
    const { handleChangeInput, handleLogin, handleRegister } = this;

    return (
      <AuthWrapper
        kind={kind}
        user_email={user_email}
        password={password}
        user_name={user_name}
        user_birth_YYYY={user_birth_YYYY}
        user_birth_MM={user_birth_MM}
        user_birth_DD={user_birth_DD}
        onChangeInput={handleChangeInput}
        onLogin={handleLogin}
        onRegister={handleRegister}
        error={error}
      />
    );
  }
}

const mapStateToProps = state => ({
  // auth form
  user_email: state.auth.form.user_email,
  password: state.auth.form.password,
  user_name: state.auth.form.user_name,
  user_birth_YYYY: state.auth.form.user_birth_YYYY,
  user_birth_MM: state.auth.form.user_birth_MM,
  user_birth_DD: state.auth.form.user_birth_DD,
  user_gender: state.auth.form.user_gender,

  // auth error
  error: state.auth.error,

  // auth logged
  logged: state.auth.logged,

  // user info
  userInfo: state.auth.userInfo,
});

const mapDispatchToProps = dispatch => ({
  AuthActions: bindActionCreators(authActions, dispatch),
  // initializeInput: () => {
  //   dispatch(authActions.initializeInput());
  // },
  // changeInput: ({ name, value }) => {
  //   dispatch(authActions.changeInput({ name, value }));
  // },
  // initializeError: () => {
  //   dispatch(authActions.initializeError());
  // },
  // registerRequest: data => {
  //   dispatch(authActions.registerRequest(data));
  // },
  // loginRequest: data => {
  //   dispatch(authActions.loginRequest(data));
  // },
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AuthContainer),
);
