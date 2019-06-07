/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import produce from 'immer';
import Intro from 'components/base/Intro';
import ProgressIndicator from 'components/base/ProgressIndicator';
import MainWrapper from 'components/main/MainWrapper';
import Discover from 'components/main/Discover';
import Repository from 'components/main/Repository';
import Wall from 'components/main/Wall';
import Notification from 'components/base/Card/Notification';
import * as userActions from 'store/modules/user';
import * as recommendActions from 'store/modules/recommend';

class MainContainer extends Component {
  state = {
    searchTo: '',
    filter: 'all',
    recommends: [],
    feeds: [],
    owner: {
      type: '',
      id: 0,
    },
  };

  componentDidMount() {
    const { userInfo, UserActions, RecommendActions } = this.props;

    if (userInfo.user_id) {
      this.setState(
        produce(draft => {
          draft.owner = {
            type: 'user',
            id: userInfo.user_id,
          };
        }),
      );
      UserActions.targetGroupsRequest(userInfo.user_id);
      UserActions.repositoriesRequest(userInfo.user_id, 0);
      UserActions.followerRequest(userInfo.user_id);
      RecommendActions.withTendencyRequest(userInfo.user_id).then(() => {
        const { shuffleRepo } = this;
        const { tendencyRepo } = this.props;
        this.setState(
          produce(draft => {
            draft.recommends = shuffleRepo(tendencyRepo);
          }),
        );
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { userInfo, UserActions, RecommendActions } = this.props;

    if (prevProps.userInfo.user_id !== userInfo.user_id) {
      this.setState(
        produce(draft => {
          draft.owner = {
            type: 'user',
            id: userInfo.user_id,
          };
        }),
      );
      UserActions.targetGroupsRequest(userInfo.user_id);
      UserActions.repositoriesRequest(userInfo.user_id, 0);
      UserActions.followerRequest(userInfo.user_id);
      RecommendActions.withTendencyRequest(userInfo.user_id).then(() => {
        const { shuffleRepo } = this;
        const { tendencyRepo } = this.props;
        this.setState(
          produce(draft => {
            draft.recommends = shuffleRepo(tendencyRepo);
          }),
        );
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.feeds !== nextProps.alert.notifications) {
      return { feeds: nextProps.alert.notifications };
    }

    return null;
  }

  shuffleRepo = repositories => {
    if (repositories.length < 4) {
      return repositories;
    }
    let count = 0;
    const randomRepo = [];
    while (count === 3) {
      const index = Math.floor(Math.random() * repositories.length);
      randomRepo.push(repositories[index]);
      count += 1;
    }
    return randomRepo;
  };

  handleFilter = e => {
    e.persist();
    e.stopPropagation();

    this.setState(
      produce(draft => {
        draft.filter = e.target.value;
      }),
    );
  };

  handleSearchTo = e => {
    this.setState({
      searchTo: e.target.value,
    });
  };

  handleChageUser = e => {
    e.persist();
    const { UserActions, userInfo } = this.props;

    if (e.target.value === 'personal') {
      UserActions.repositoriesRequest(userInfo.user_id, 0);
      this.setState(
        produce(draft => {
          draft.owner = {
            type: 'user',
            id: userInfo.user_id,
          };
        }),
      );
    } else {
      UserActions.repositoriesRequest(0, e.target.value);
      this.setState(
        produce(draft => {
          draft.owner = {
            type: 'group',
            id: e.target.value,
          };
        }),
      );
    }
  };

  render() {
    const { handleFilter, handleSearchTo, handleChageUser } = this;
    const { searchTo, filter, recommends, feeds, owner } = this.state;
    const {
      alert,
      authState,
      userState,
      userInfo,
      groups,
      repositories,
    } = this.props;
    if (!localStorage.getItem('userInfo')) {
      return <Intro />;
    }
    if (
      authState === 'success' &&
      alert.state === 'success' &&
      userState.group === 'success' &&
      userState.follower === 'success'
    ) {
      return (
        <MainWrapper>
          {userInfo.user_id && (
            <>
              <Repository
                userState={userState}
                userInfo={userInfo}
                groups={groups}
                owner={owner}
                repositories={repositories}
                filter={filter}
                searchTo={searchTo}
                handleFilter={handleFilter}
                handleSearchTo={handleSearchTo}
                handleChageUser={handleChageUser}
              />
              <article>
                <section>
                  <Wall>
                    {feeds.map((notify, i) => (
                      <Notification
                        key={i}
                        loggedUserId={userInfo.user_id}
                        notify={notify}
                      />
                    ))}
                  </Wall>
                </section>
                <aside>
                  <Discover tendencyRepo={recommends} />
                </aside>
              </article>
            </>
          )}
        </MainWrapper>
      );
    }
    return <ProgressIndicator />;
  }
}
const mapStateToProps = state => ({
  authState: state.auth.state,
  userInfo: state.auth.userInfo,
  userState: state.user.state,
  info: state.user.info,
  followings: state.user.following,
  groups: state.user.groups,
  repositories: state.user.repositories,
  recommendState: state.recommend.state,
  tendencyRepo: state.recommend.tendency,
  alert: state.alert,
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(userActions, dispatch),
  RecommendActions: bindActionCreators(recommendActions, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MainContainer),
);
