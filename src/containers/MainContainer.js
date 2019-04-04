import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MainWrapper from 'components/main/MainWrapper';
import Discover from 'components/main/Discover';
import Repository from 'components/main/Repository';
import Wall from 'components/main/Wall';

class MainContainer extends Component {
  render() {
    const { userInfo } = this.props;
    return (
      <MainWrapper>
        <Repository user={userInfo} />
        <article>
          <section>
            <Wall />
          </section>
          <aside>
            <Discover />
          </aside>
        </article>
      </MainWrapper>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MainContainer),
);
