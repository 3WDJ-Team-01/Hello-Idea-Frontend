/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProgressIndicator from 'components/base/ProgressIndicator';
import Nav from 'components/alert/Nav';
import AlertWrapper from 'components/alert/AlertWrapper';
import Alerts from 'components/alert/Alerts';
import produce from 'immer';

class AlertContainer extends Component {
  state = {
    type: 'Notifications',
    alerts: {
      Notifications: [],
      Requests: [],
    },
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.alerts.Notifications !== nextProps.alert.notifications) {
      return {
        alerts: {
          ...prevState.alerts,
          Notifications: nextProps.alert.notifications,
        },
      };
    }
    if (prevState.alerts.Requests !== nextProps.alert.requests) {
      return {
        alerts: {
          ...prevState.alerts,
          Requests: nextProps.alert.requests,
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

  render() {
    const { handleType } = this;
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
          <Alerts type={type} alerts={alerts} loggedUserId={loggedUserId} />
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
