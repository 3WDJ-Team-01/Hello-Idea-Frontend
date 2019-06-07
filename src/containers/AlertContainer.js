/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import produce from 'immer';
import ProgressIndicator from 'components/base/ProgressIndicator';
import Nav from 'components/alert/Nav';
import AlertWrapper from 'components/alert/AlertWrapper';
import Alerts from 'components/alert/Alerts';

class AlertContainer extends Component {
  constructor(props) {
    super(props);
    const { type } = props;

    this.state = {
      type,
      alerts: {
        notifications: [],
        requests: [],
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.alerts.notifications !== nextProps.alert.notifications ||
      prevState.alerts.requests !== nextProps.alert.requests
    ) {
      return {
        alerts: {
          requests: nextProps.alert.requests,
          notifications: nextProps.alert.notifications,
        },
      };
    }

    return null;
  }

  handleType = e => {
    this.setState(
      produce(this.state, draft => {
        draft.type = e.target.attributes.name.nodeValue;
      }),
    );
  };

  handleConsent = id => {
    const request_id = id;

    axios.post('/api/request_accept/', {
      request_id,
      is_accepted: 2,
    });
    // axios.post('/api/group/invite/', {
    //   request_id
    //   group_id:,
    //   user_id:,
    // })
  };

  handleRefuse = id => {
    const request_id = id;

    axios.post('/request_accept/', {
      request_id,
      is_accepted: 1,
    });
  };

  render() {
    const { handleType, handleConsent, handleRefuse } = this;
    const { authState, loggedUserId } = this.props;
    const { type, alerts } = this.state;
    if (authState === 'success')
      return (
        <AlertWrapper>
          <Nav
            type={type}
            typeList={Object.keys(alerts)}
            handleType={handleType}
          />
          <Alerts
            type={type}
            alerts={alerts}
            loggedUserId={loggedUserId}
            handleConsent={handleConsent}
            handleRefuse={handleRefuse}
          />
        </AlertWrapper>
      );
    return <ProgressIndicator />;
  }
}

const mapStateToProps = state => ({
  alert: state.alert,
  authState: state.auth.state,
  loggedUserId: state.auth.userInfo.user_id,
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AlertContainer),
);
