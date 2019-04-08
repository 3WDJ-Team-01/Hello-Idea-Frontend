import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Header from '../components/base/Header';
import * as authActions from '../store/modules/auth';

class HeaderContainer extends Component {
  state = {
    searchTo: '',
  };

  componentDidMount() {
    this.checkUser();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.auth.state !== 'pending' && nextProps.auth.state !== 'success'
    );
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('updated');
    this.checkUser();
  }

  checkUser = () => {
    const { history, AuthActions } = this.props;
    if (localStorage.getItem('userInfo')) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      AuthActions.setUserTemp({
        user_email: userInfo.user_email,
        user_name: userInfo.username,
        token: userInfo.token,
      });
    } else {
      if (!window.location.pathname.includes('auth')) {
        history.push('/auth/login');
      }
      return;
    }
    AuthActions.userRequest();
  };

  handleLogout = () => {
    const { AuthActions } = this.props;
    AuthActions.logoutRequest();
  };

  handleSearch = e => {
    const { searchTo } = this.state;
    this.setState({ searchTo: e.currentTarget.value });
  };

  render() {
    const { isHidden } = this.props;
    const { searchTo } = this.state;
    const { handleLogout, handleSearch } = this;

    return isHidden ? null : (
      <Header
        searchTo={searchTo}
        onLogout={handleLogout}
        onChange={handleSearch}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
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
