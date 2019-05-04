import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import produce from 'immer';
import AuthWrapper from 'components/auth/AuthWrapper';
import LoginForm from 'components/auth/AuthForm/LoginForm';
import RegisterForm from 'components/auth/AuthForm/RegisterForm';
import * as authActions from 'store/modules/auth';
import * as alertActions from 'store/modules/alert';

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
    const { history, kind, logged, userInfo, AlertActions } = this.props;
    if (prevProps.kind !== kind) {
      this.initialize();
    }
    if (prevProps.logged !== logged && logged) {
      const { user_id, user_name, token } = userInfo;
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          user_id,
          user_name,
          token,
        }),
      );
      AlertActions.connectToWebsocket(user_id);
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

  changeInput = e => {
    const { name, value } = e.target;
    this.setState(
      produce(draft => {
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
      <AuthWrapper head="Hello Idea !">
        {kind === 'login' ? (
          <LoginForm
            user_email={form.user_email}
            password={form.password}
            changeInput={changeInput}
            handleLogin={handleLogin}
            error={error}
          />
        ) : (
          <RegisterForm
            user_email={form.user_email}
            password={form.password}
            user_name={form.user_name}
            user_birth_YYYY={form.user_birth_YYYY}
            user_birth_MM={form.user_birth_MM}
            user_birth_DD={form.user_birth_DD}
            changeInput={changeInput}
            handleRegister={handleRegister}
            error={error}
          />
        )}
      </AuthWrapper>
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
  AlertActions: bindActionCreators(alertActions, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AuthContainer),
);
