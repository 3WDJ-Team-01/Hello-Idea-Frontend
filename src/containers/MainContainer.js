import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import produce from 'immer';
import MainWrapper from 'components/main/MainWrapper';
import Discover from 'components/main/Discover';
import Repository from 'components/main/Repository';
import Wall from 'components/main/Wall';
import * as userActions from 'store/modules/user';
import * as recommendActions from 'store/modules/recommend';

class MainContainer extends Component {
  componentDidMount() {
    const { UserActions, RecommendActions } = this.props;
    if (localStorage.getItem('userInfo')) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      UserActions.targetGroupsRequest(userInfo.user_id);
      UserActions.repositoriesRequest(userInfo.user_id, 0);
      RecommendActions.withTendencyRequest(userInfo.user_id);
    }
  }

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
    const { handleChageUser } = this;
    const { userInfo, groups, repositories, tendencyRepo } = this.props;
    return (
      <MainWrapper>
        {userInfo.user_id && (
          <>
            <Repository
              userInfo={userInfo}
              groups={groups}
              repositories={repositories.all}
              handleChageUser={handleChageUser}
            />
            <article>
              <section>
                <Wall />
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
}
const mapStateToProps = state => ({
  state: state.user.state,
  info: state.user.info,
  groups: state.user.groups,
  repositories: state.user.repositories,
  userInfo: state.auth.userInfo,
  tendencyRepo: state.recommend.tendency,
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
