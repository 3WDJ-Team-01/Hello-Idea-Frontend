import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Header from '../components/base/Header';
import * as authActions from '../store/modules/auth';

class HeaderContainer extends Component {
  componentDidMount() {
    this.checkUser();
  }

  componentDidUpdate(prevProps, prevState) {
    this.checkUser();
  }

  checkUser = () => {
    const { history, AuthActions } = this.props;
    // if (localStorage.getItem('userInfo')) {
    //   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //   AuthActions.setUserTemp({
    //     user_email: userInfo.user_email,
    //     user_name: userInfo.username,
    //     token: userInfo.token,
    //   });
    // }

    // AuthActions.userRequest().then(() => {
    //   const { logged } = this.props;
    //   if (!logged && !window.location.pathname.includes('auth')) {
    //     history.push('/auth/login');
    //   }
    // });
  };

  handleLogout = () => {
    const { AuthActions } = this.props;
    AuthActions.logoutRequest();
  };

  render() {
    const { isHidden } = this.props;
    const { handleLogout } = this;

    return isHidden ? null : <Header onLogout={handleLogout} />;
  }
}

const mapStateToProps = state => ({
  logged: state.auth.logged,
});

const mapDisaptchToProps = dispatch => ({
  AuthActions: bindActionCreators(authActions, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDisaptchToProps,
  )(HeaderContainer),
);
