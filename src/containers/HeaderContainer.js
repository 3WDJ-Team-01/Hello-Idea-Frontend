/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import produce from 'immer';
import Header from 'components/base/Header';
import * as authActions from 'store/modules/auth';
import * as alertActions from 'store/modules/alert';

class HeaderContainer extends Component {
  constructor(props) {
    super(props);
    const targetURL = /(auth|editor)/;
    this.state = {
      isHidden: targetURL.test(props.history.location),
      searchTo: '',
    };
    this.checkUser();
  }

  componentDidMount() {
    const { AlertActions } = this.props;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      AlertActions.connectToWebsocket(userInfo.user_id);
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { pathname } = this.props.history.location;
    const targetURL = /(auth|editor)/;
    if (prevProps.history.location.pathname !== pathname) this.checkUser();
    return produce(draft => {
      draft.isHidden = targetURL.test(pathname);
    });
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
      if (!history.location.pathname.includes('auth')) {
        history.push('/auth/login');
      }
      return;
    }

    AuthActions.userRequest();
  };

  handleLogout = () => {
    const { checkUser } = this;
    const { AuthActions } = this.props;

    AuthActions.logoutRequest().then(() => this.checkUser());
  };

  handleSearch = e => {
    this.setState({ searchTo: e.currentTarget.value });
  };

  render() {
    const { history } = this.props;
    const { isHidden, searchTo } = this.state;
    const { handleLogout, handleSearch } = this;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (isHidden || !userInfo) return null;
    return (
      <Header
        history={history}
        searchTo={searchTo}
        onLogout={handleLogout}
        onChange={handleSearch}
        userInfo={userInfo}
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
  AlertActions: bindActionCreators(alertActions, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDisaptchToProps,
  )(HeaderContainer),
);
