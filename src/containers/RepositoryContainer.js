/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
/* eslint-disable no-useless-return */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as repositoryActions from 'store/modules/repository';
import * as alertActions from 'store/modules/alert';
import axios from 'axios';
import produce from 'immer';
import ProgressIndicator from 'components/base/ProgressIndicator';
import Header from 'components/repository/Header';
import RepositoryWrapper from 'components/repository/RepositoryWrapper';
import Overview from 'components/repository/Overview';
import Setting from 'components/repository/Setting';

class RepositoryContainer extends Component {
  state = {
    name: '',
    description: '',
    isLiked: false,
  };

  componentDidMount() {
    const { viewRepository } = this;
    const { loggedUserId } = this.props;

    if (loggedUserId) viewRepository(loggedUserId);
  }

  componentDidUpdate(prevProps, prevState) {
    const { initialize, viewRepository } = this;
    const { loggedUserId, repositoryId } = this.props;

    if (prevProps.loggedUserId !== loggedUserId) viewRepository(loggedUserId);

    if (prevProps.repositoryId !== repositoryId) {
      initialize().then(() => {
        viewRepository(loggedUserId);
      });
    }
  }

  componentWillUnmount() {
    const { initialize } = this;
    initialize();
  }

  /* === Actions start === */

  initialize = () =>
    new Promise((res, rej) => {
      const { RepositoryActions } = this.props;
      RepositoryActions.initialize();
      res();
    });

  viewRepository = loggedUserId => {
    const { RepositoryActions, repositoryId } = this.props;
    axios
      .post('/api/project/hit/', {
        user_id: loggedUserId,
        project_id: repositoryId,
      })
      .then(() => {
        RepositoryActions.getRequest(repositoryId).then(() => {
          const { repositoryInfo, likedUsers } = this.props;
          // this.setState(
          //   produce(draft => {
          //     draft.name = repositoryInfo.project_topic;
          //     draft.description = repositoryInfo.project_intro;
          //     likedUsers.map(user => {
          //       if (user.user_id == loggedUserId) draft.isLiked = true;
          //     });
          //   }),
          // );
        });
      });
  };

  handleStar = () => {
    const {
      RepositoryActions,
      AlertActions,
      authorId,
      repositoryId,
      loggedUserId,
      loggedUserFollowers,
    } = this.props;
    const { isLiked } = this.state;

    if (isLiked) {
      axios
        .post('/api/project/like/delete/', {
          user_id: loggedUserId,
          project_id: repositoryId,
        })
        .then(() => {
          RepositoryActions.getRequest(repositoryId).then(() => {
            this.setState(
              produce(draft => {
                draft.isLiked = false;
              }),
            );
          });
        });
    } else {
      axios
        .post('/api/project/like/', {
          user_id: loggedUserId,
          project_id: repositoryId,
        })
        .then(() => {
          AlertActions.sendNotify({
            type: 'like',
            send_id: loggedUserId,
            receive_id: [parseInt(authorId, 10), ...loggedUserFollowers],
            target_id: repositoryId,
          });
          RepositoryActions.getRequest(repositoryId).then(() => {
            this.setState(
              produce(draft => {
                draft.isLiked = true;
              }),
            );
          });
        });
    }
  };

  handleChange = e => {
    e.persist();
    this.setState(
      produce(draft => {
        draft[e.target.name] = e.target.value;
      }),
    );
  };

  handleSubmit = () => {
    const { repositoryId, RepositoryActions, history, author } = this.props;
    const { name, description } = this.state;
    RepositoryActions.updateRequest({
      project_id: repositoryId,
      project_topic: name,
      project_intro: description,
    }).then(() => {
      RepositoryActions.getRequest(repositoryId).then(() => {
        const { repositoryInfo } = this.props;
        this.setState(
          produce(draft => {
            draft.name = repositoryInfo.project_topic;
            draft.description = repositoryInfo.project_intro;
          }),
        );
        history.push(`/user/${author}/repositories/${repositoryId}`);
      });
    });
  };

  handleRemove = () => {
    const {
      repositoryId,
      RepositoryActions,
      history,
      repositoryInfo,
    } = this.props;
    if (window.confirm('해당 저장소를 삭제하시겠습니까?')) {
      RepositoryActions.removeRequest(repositoryId).then(() => {
        if (repositoryInfo.group_id === 0)
          history.push(`/user/${repositoryInfo.user_id}/repositories/`);
      });
    } else return;
  };

  /* === Actions end === */

  renderMenu = menu => {
    const { handleChange, handleSubmit, handleRemove } = this;
    const {
      repositoryId,
      repositoryInfo,
      repositoryCategory,
      similarRepository,
    } = this.props;
    const { name, description } = this.state;

    switch (menu) {
      case 'settings':
        return (
          <Setting
            repositoryId={repositoryId}
            name={name}
            description={description}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleRemove={handleRemove}
          />
        );
      default:
        return (
          <Overview
            repositoryId={repositoryId}
            repositoryInfo={repositoryInfo}
            repositoryCategory={repositoryCategory}
            similarRepository={similarRepository}
          />
        );
    }
  };

  render() {
    const { renderMenu, handleStar } = this;
    const { isLiked } = this.state;
    const {
      url,
      menu,
      loggedUserId,
      repositoryId,
      authState,
      state,
      author,
      authorId,
      repositoryInfo,
    } = this.props;
    if (authState === 'success' && state.read === 'success')
      return (
        <>
          <Header
            url={url}
            menu={menu}
            author={author}
            authorId={authorId}
            loggedUserId={loggedUserId}
            isLiked={isLiked}
            repositoryId={repositoryId}
            repositoryInfo={repositoryInfo}
            handleStar={handleStar}
          />
          <RepositoryWrapper>{renderMenu(menu)}</RepositoryWrapper>
        </>
      );
    return <ProgressIndicator />;
  }
}

const mapStateToProps = state => ({
  state: state.repository.state,
  authState: state.auth.state,
  loggedUserId: state.auth.userInfo.user_id,
  loggedUserFollowers: state.auth.relation.followersId,
  groups: state.user.groups,
  author: state.repository.author,
  repositoryInfo: state.repository.info,
  repositoryCategory: state.repository.category,
  similarRepository: state.repository.similar,
  likedUsers: state.repository.likes,
});

const mapDispatchToProps = dispatch => ({
  RepositoryActions: bindActionCreators(repositoryActions, dispatch),
  AlertActions: bindActionCreators(alertActions, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(RepositoryContainer),
);
