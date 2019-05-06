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
    if (prevProps.match.url !== url) this.checkUser();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.notifications !== nextProps.notifications) {
      return {
        isNewMessage: nextProps.isNewMessage,
        notifications: nextProps.notifications,
      };
    }

    return null;
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
    } else if (!history.location.pathname.includes('auth')) {
      history.push('/auth/login');
    }

    AuthActions.userRequest();
  };

  handleLogout = () => {
    const { checkUser } = this;
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
    const { history, AlertActions } = this.props;
    const { isHidden, searchTo, isNewMessage, notifications } = this.state;
    const {
      handleLogout,
      handleSearch,
      handleDropdown,
      handleReadAlerts,
    } = this;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const { pathname } = history.location;
    const targetURL = /(auth|editor|viewer)/;

    if (targetURL.test(pathname) || !userInfo) return null;
    return (
      <Header
        history={history}
        searchTo={searchTo}
        onClick={handleDropdown}
        onLogout={handleLogout}
        onChange={handleSearch}
        userInfo={userInfo}
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
