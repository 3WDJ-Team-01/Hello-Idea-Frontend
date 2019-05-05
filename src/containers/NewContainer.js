/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import produce from 'immer';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import New from 'components/repository/New';
import ProgressIndicator from 'components/base/ProgressIndicator';
import * as userActions from 'store/modules/user';
import * as repositoryActions from 'store/modules/repository';
import * as alertActions from 'store/modules/alert';

class NewContainer extends Component {
  state = {
    author_id: '',
    name: '',
    desc: '',
  };

  componentDidMount() {
    const { userInfo, UserActions } = this.props;
    if (userInfo.user_id) {
      UserActions.targetGroupsRequest(userInfo.user_id);
      this.setState(
        produce(draft => {
          draft.author_id = userInfo.user_id;
        }),
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { userInfo, UserActions } = this.props;

    if (prevProps.userInfo.user_id !== userInfo.user_id) {
      UserActions.targetGroupsRequest(userInfo.user_id);
      this.setState(
        produce(draft => {
          draft.author_id = userInfo.user_id;
        }),
      );
    }
  }

  handleChange = ({ target }) => {
    this.setState(
      produce(draft => {
        draft[target.name] = target.value;
      }),
    );
  };

  handleSubmit = () => {
    const {
      userInfo,
      RepositoryActions,
      AlertActions,
      loggedUserFollowers,
      history,
    } = this.props;
    const { author_id, name, desc } = this.state;

    const notify = repositoryId => {
      AlertActions.sendNotify({
        type: 'create',
        send_id: userInfo.user_id,
        receive_id: loggedUserFollowers,
        target_id: repositoryId,
      });
    };

    if (typeof author_id === 'string' && author_id.includes('G')) {
      RepositoryActions.createRequest({
        user_id: 0,
        group_id: author_id.replace('G', ''),
        project_topic: name,
        project_intro: desc,
        history,
        notify,
      });
    } else {
      RepositoryActions.createRequest({
        user_id: author_id,
        group_id: 0,
        project_topic: name,
        project_intro: desc,
        history,
        notify,
      });
    }
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { name, desc } = this.state;
    const { state, authState, groups, userInfo } = this.props;

    if (authState === 'success')
      return (
        <New
          state={state}
          groups={groups}
          userInfo={userInfo}
          name={name}
          desc={desc}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      );
    return <ProgressIndicator />;
  }
}

const mapStateToProps = state => ({
  state: state.repository.state,
  authState: state.auth.state,
  groups: state.user.groups,
  userInfo: state.auth.userInfo,
  project_id: state.repository.info.project_id,
  loggedUserFollowers: state.auth.relation.followersId,
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(userActions, dispatch),
  RepositoryActions: bindActionCreators(repositoryActions, dispatch),
  AlertActions: bindActionCreators(alertActions, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NewContainer),
);
