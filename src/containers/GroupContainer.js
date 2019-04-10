import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as exploreActions from 'store/modules/explore';
import produce from 'immer';
import GroupWrapper from 'components/group/GroupWrapper';
import Header from 'components/group/Header';
import Repositories from 'components/group/Repositories';

class GroupContainer extends Component {
  render() {
    return (
      <>
        <Header />
        <GroupWrapper />
      </>
    );
  }
}

const mapStateToProps = state => ({
  state: state.explore.state,
  error: state.explore.error,
  news: state.explore.news,
});

const mapDispatchToProps = dispatch => ({
  ExploreActions: bindActionCreators(exploreActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupContainer);
