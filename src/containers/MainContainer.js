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
    feeds: [],
  };

  componentDidMount() {
    const { UserActions, RecommendActions } = this.props;
    if (localStorage.getItem('userInfo')) {
      const { user_id } = JSON.parse(localStorage.getItem('userInfo'));
      UserActions.targetGroupsRequest(user_id);
      UserActions.repositoriesRequest(user_id, 0);
      UserActions.followerRequest(user_id);
      RecommendActions.withTendencyRequest(user_id);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.feeds !== nextProps.alert.notifications) {
      return { feeds: nextProps.alert.notifications };
    }

    return null;
  }

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
    const { UserActions } = this.props;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (e.target.value === 'personal') {
      UserActions.repositoriesRequest(userInfo.user_id, 0);
    } else {
      UserActions.repositoriesRequest(0, e.target.value);
    }
  };

  render() {
    const { handleFilter, handleSearchTo, handleChageUser } = this;
    const { searchTo, filter, feeds } = this.state;
    const {
      alert,
      userState,
      recommendState,
      userInfo,
      followings,
      groups,
      repositories,
      tendencyRepo,
    } = this.props;
    if (
      alert.state === 'success' &&
      userState.group === 'success' &&
      userState.follower === 'success'
    ) {
      console.log(feeds);
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
                      <Notification key={i} notify={notify} />
                    ))}
                  </Wall>
                </section>
                <aside>
                  <Discover tendencyRepo={tendencyRepo} />
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
