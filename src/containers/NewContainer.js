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
import * as groupActions from 'store/modules/group';
import * as repositoryActions from 'store/modules/repository';
import * as alertActions from 'store/modules/alert';

class NewContainer extends Component {
  constructor(props) {
    super(props);
    const { history } = props;
    const type = history.location.pathname.split('/')[1];
    const targetId = parseInt(history.location.pathname.split('/')[2], 10);

    this.state = {
      author_id: type === 'user' ? targetId : `G${targetId}`,
      name: '',
      desc: '',
    };
  }

  componentDidMount() {
    const { history, userInfo, UserActions, GroupActions } = this.props;
    const { author_id } = this.state;
    const type = history.location.pathname.split('/')[1];

    if (userInfo.user_id) {
      UserActions.targetGroupsRequest(userInfo.user_id);
    }
    if (type === 'group') {
      const group_id = parseInt(author_id.replace('G', ''), 10);

      GroupActions.peopleRequest(group_id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { userInfo, UserActions, GroupActions } = this.props;
    const { author_id } = this.state;
    if (prevProps.userInfo.user_id !== userInfo.user_id) {
      UserActions.targetGroupsRequest(userInfo.user_id);
    }
    if (
      prevState.author_id !== author_id &&
      typeof author_id === 'string' &&
      author_id.includes('G')
    ) {
      const group_id = parseInt(author_id.replace('G', ''), 10);

      GroupActions.peopleRequest(group_id);
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
      groupPeople,
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
      const member =
        groupPeople.length > 0 ? groupPeople.map(people => people.user_id) : [];
      RepositoryActions.createRequest({
        user_id: 0,
        group_id: parseInt(author_id.replace('G', ''), 10),
        project_topic: name,
        project_intro: desc,
        history,
        notify,
        member,
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
    const {
      state,
      authState,
      groupState,
      groups,
      userInfo,
      history,
    } = this.props;
    if (authState === 'success' && groupState === 'success')
      return (
        <New
          history={history}
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
  groupState: state.user.state.group,
  groups: state.user.groups,
  groupPeople: state.group.people,
  userInfo: state.auth.userInfo,
  project_id: state.repository.info.project_id,
  loggedUserFollowers: state.auth.relation.followersId,
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(userActions, dispatch),
  GroupActions: bindActionCreators(groupActions, dispatch),
  RepositoryActions: bindActionCreators(repositoryActions, dispatch),
  AlertActions: bindActionCreators(alertActions, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NewContainer),
);
