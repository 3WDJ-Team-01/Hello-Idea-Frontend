/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import produce from 'immer';
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
  };

  componentDidMount() {
    const { userInfo, UserActions, RecommendActions } = this.props;

    if (userInfo.user_id) {
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
    let count = 0;
    const randomRepo = [];
    repositories.forEach((repository, index) => {
      if (count !== 3 && index - count > 2) {
        count += 1;
        randomRepo.push(repository);
      } else if (count !== 3 && Math.random() < 0.5) {
        count += 1;
        randomRepo.push(repository);
      }
    });
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
    const { UserActions, userInfo } = this.props;

    if (e.target.value === 'personal') {
      UserActions.repositoriesRequest(userInfo.user_id, 0);
    } else {
      UserActions.repositoriesRequest(0, e.target.value);
    }
  };

  render() {
    const { handleFilter, handleSearchTo, handleChageUser } = this;
    const { searchTo, filter, recommends, feeds } = this.state;
    const {
      alert,
      authState,
      userState,
      recommendState,
      userInfo,
      followings,
      groups,
      repositories,
      tendencyRepo,
    } = this.props;
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
