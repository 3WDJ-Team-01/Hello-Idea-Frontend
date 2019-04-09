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
      (nextProps.state !== 'pending' && nextProps.state !== 'success') ||
      nextState.searchTo !== this.state.searchTo
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchTo === '') this.checkUser();
  }

  checkUser = () => {
    const { history, AuthActions } = this.props;
    if (localStorage.getItem('userInfo')) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      AuthActions.setUserTemp({
        user_id: userInfo.user_id,
        user_name: userInfo.user_name,
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
  state: state.auth.state,
  error: state.auth.error,
  logged: state.auth.logged,
  userInfo: state.auth.userInfo,
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
