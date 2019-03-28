import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from '../components/base/Header';
import * as authActions from '../store/modules/auth';

export class HeaderContainer extends Component {
  componentDidMount() {
    this.checkUser();
  }

  componentDidUpdate(prevProps, prevState) {
    const { logged } = this.props;
    if (prevProps.logged !== logged && !logged) {
      window.location.href = `/auth/login`;
    }
  }

  checkUser = () => {
    const { logged, userRequest, setUserTemp, history } = this.props;

    if (localStorage.getItem('userInfo')) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      setUserTemp({
        id: userInfo.id,
        username: userInfo.username,
        token: userInfo.token,
      });
      return;
    }

    userRequest();

    if (!logged && !window.location.pathname.includes('auth')) {
      history.push('/auth/login');
    }
  };

  handleLogout = () => {
    const { logout } = this.props;
    logout();
  };

  render() {
    const { handleLogout } = this;

    return <Header onLogout={handleLogout} />;
  }
}

const mapStateToProps = state => ({
  logged: state.auth.logged,
});

const mapDisaptchToProps = dispatch => ({
  logoutRequest: data => {
    dispatch(authActions.logoutRequest(data));
  },
  userRequest: data => {
    dispatch(authActions.userRequest(data));
  },
  setUserTemp: ({ id, username }) => {
    dispatch(authActions.setUserTemp({ id, username }));
  },
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDisaptchToProps,
  )(HeaderContainer),
);
