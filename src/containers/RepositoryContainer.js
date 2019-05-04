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
    const { RepositoryActions, repositoryId } = this.props;
    const { user_id } = JSON.parse(localStorage.getItem('userInfo'));

    axios
      .post('/api/project/hit/', {
        user_id,
        project_id: repositoryId,
      })
      .then(() => {
        RepositoryActions.getRequest(repositoryId).then(() => {
          const { repositoryInfo, likedUsers } = this.props;
          this.setState(
            produce(draft => {
              draft.name = repositoryInfo.project_topic;
              draft.description = repositoryInfo.project_intro;
              likedUsers.map(user => {
                if (user.user_id == user_id) draft.isLiked = true;
              });
            }),
          );
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { initialize } = this;
    const { repositoryId, RepositoryActions } = this.props;
    const { user_id } = JSON.parse(localStorage.getItem('userInfo'));

    if (prevProps.repositoryId !== repositoryId) {
      initialize().then(() => {
        axios
          .post('/api/project/hit/', {
            user_id,
            project_id: repositoryId,
          })
          .then(() => {
            RepositoryActions.getRequest(repositoryId).then(() => {
              const { repositoryInfo, likedUsers } = this.props;
              this.setState(
                produce(draft => {
                  draft.name = repositoryInfo.project_topic;
                  draft.description = repositoryInfo.project_intro;
                  likedUsers.map(user => {
                    if (user.user_id == user_id) draft.isLiked = true;
                  });
                }),
              );
            });
          });
      });
    }
  }

  componentWillUnmount() {
    const { initialize } = this;
    initialize();
  }

  initialize = () =>
    new Promise((res, rej) => {
      const { RepositoryActions } = this.props;
      RepositoryActions.initialize();
      res();
    });

  handleStar = () => {
    const {
      RepositoryActions,
      AlertActions,
      authorId,
      repositoryId,
      loggedUserFollowers,
    } = this.props;
    const { user_id } = JSON.parse(localStorage.getItem('userInfo'));
    const { isLiked } = this.state;

    if (isLiked) {
      axios
        .post('/api/project/like/delete/', {
          user_id,
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
          user_id,
          project_id: repositoryId,
        })
        .then(() => {
          AlertActions.sendNotify({
            type: 'like',
            send_id: user_id,
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
      repositoryId,
      state,
      author,
      repositoryInfo,
    } = this.props;
    if (state.read === 'success')
      return (
        <>
          <Header
            url={url}
            menu={menu}
            author={author}
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
  loggedUserFollowers: state.auth.relation.followersId,
  groups: state.user.groups,
  userInfo: state.auth.userInfo,
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
