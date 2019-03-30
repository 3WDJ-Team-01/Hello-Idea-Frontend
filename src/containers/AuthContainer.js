import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import produce from 'immer';
import AuthWrapper from '../components/auth/AuthWrapper';
import * as authActions from '../store/modules/auth';

class AuthContainer extends Component {
  state = {
    form: {
      user_email: '',
      password: '',
      user_name: '',
      user_birth_YYYY: '',
      user_birth_MM: '',
      user_birth_DD: '',
      user_gender: '',
    },
  };

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
    const { state } = this;
    this.setState(
      produce(state, draft => {
        draft.form = {
          user_email: '',
          password: '',
          user_name: '',
          user_birth_YYYY: '',
          user_birth_MM: '',
          user_birth_DD: '',
          user_gender: '',
        };
        draft.error = {
          type: '',
          message: '',
        };
      }),
    );
  };

  changeInput = ({ name, value, id }) => {
    const { state } = this;
    this.setState(
      produce(state, draft => {
        switch (name) {
          case 'user_birth_YYYY':
            const d = new Date();
            if (value <= d.getFullYear()) draft.form[name] = value;
            break;
          case 'user_birth_MM':
            if (value < 13) draft.form[name] = value;
            break;
          case 'user_birth_DD':
            if (value < 32) draft.form[name] = value;
            break;
          default:
            draft.form[name] = value;
            break;
        }
      }),
    );
  };

  handleLogin = () => {
    const { AuthActions } = this.props;
    const { form } = this.state;
    AuthActions.loginRequest({
      user_email: form.user_email,
      password: form.password,
    });
  };

  handleRegister = () => {
    const { AuthActions } = this.props;
    const { form } = this.state;
    AuthActions.registerRequest({
      user_email: form.user_email,
      password: form.password,
      user_name: form.user_name,
      user_gender: form.user_gender,
      user_birth:
        `${parseInt(form.user_birth_YYYY, 10)}-` +
        `${parseInt(form.user_birth_MM, 10)}-` +
        `${parseInt(form.user_birth_DD, 10)}`,
    });
  };

  render() {
    const { kind, error } = this.props;
    const { form } = this.state;
    const { changeInput, handleLogin, handleRegister } = this;

    return (
      <AuthWrapper
        kind={kind}
        user_email={form.user_email}
        password={form.password}
        user_name={form.user_name}
        user_birth_YYYY={form.user_birth_YYYY}
        user_birth_MM={form.user_birth_MM}
        user_birth_DD={form.user_birth_DD}
        onChangeInput={changeInput}
        onLogin={handleLogin}
        onRegister={handleRegister}
        error={error}
      />
    );
  }
}

const mapStateToProps = state => ({
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
