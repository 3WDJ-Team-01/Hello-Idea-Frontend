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

    this.state = {
      searchTo: '',
      isNewMessage: false,
      notifications: [],
      requests: [],
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

  componentDidUpdate(prevProps, prevState) {
    const { url } = this.props.match;
    if (prevProps.match.url !== url) {
      this.checkUser();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.notifications !== nextProps.notifications ||
      prevState.requests !== nextProps.requests
    ) {
      return {
        isNewMessage: nextProps.isNewMessage,
        notifications: nextProps.notifications,
        requests: nextProps.requests,
      };
    }

    return null;
  }

  checkUser = () => {
    const { AuthActions } = this.props;
    if (localStorage.getItem('userInfo')) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      AuthActions.setUserTemp({
        user_id: userInfo.user_id,
        user_name: userInfo.user_name,
        token: userInfo.token,
      });
    }
    // else if (!history.location.pathname.includes('auth')) {
    //   history.push('/auth/login');
    // }

    AuthActions.userRequest();
  };

  handleLogout = () => {
    const { AuthActions } = this.props;

    AuthActions.logoutRequest().then(() => this.checkUser());
  };

  handleSearch = e => {
    e.persist();

    this.setState(
      produce(draft => {
        draft.searchTo = e.target.value;
      }),
    );
  };

  goSearch = () => {
    const { searchTo } = this.state;
    const { history } = this.props;
    history.push(`/search/${searchTo}`);
    this.setState(
      produce(draft => {
        draft.searchTo = '';
      }),
    );
  };

  handleDropdown = e => {
    const dropdown = document.querySelectorAll('details');
    dropdown.forEach(dom => {
      dom.open = false;
    });
  };

  handleReadAlerts = () => {
    const { AlertActions } = this.props;
    const { user_id } = JSON.parse(localStorage.getItem('userInfo'));
    AlertActions.readAllNotificationsRequest(user_id);
    this.setState(
      produce(draft => {
        draft.isNewMessage = false;
      }),
    );
  };

  render() {
    const { history } = this.props;
    const { searchTo, isNewMessage, notifications, requests } = this.state;
    const {
      handleLogout,
      handleSearch,
      handleDropdown,
      handleReadAlerts,
      goSearch,
    } = this;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const { pathname } = history.location;
    const targetURL = /(auth|editor|viewer)/;

    if (targetURL.test(pathname) || !userInfo) return null;
    return (
      <Header
        history={history}
        searchTo={searchTo}
        goSearch={goSearch}
        onClick={handleDropdown}
        onLogout={handleLogout}
        onChange={handleSearch}
        userInfo={userInfo}
        requests={requests}
        notifications={notifications}
        isNewMessage={isNewMessage}
        handleReadAlerts={handleReadAlerts}
      />
    );
  }
}

const mapStateToProps = state => ({
  state: state.auth.state,
  error: state.auth.error,
  logged: state.auth.logged,
  userInfo: state.auth.userInfo,
  isNewMessage: state.alert.newMessage,
  notifications: state.alert.notifications,
  requests: state.alert.requests,
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
