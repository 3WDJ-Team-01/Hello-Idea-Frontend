/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as exploreActions from 'store/modules/explore';
import produce from 'immer';
import ExploreWrapper from 'components/explore/ExploreWrapper';
import List from 'components/explore/List';
import Item from 'components/explore/Item';

class ExploreContainer extends Component {
  state = {
    news: [],
  };

  componentDidMount() {
    const { ExploreActions } = this.props;
    const { shuffleNews } = this;
    ExploreActions.crawlingRequest().then(() => {
      this.setState(
        produce(draft => {
          draft.news = shuffleNews(this.props.news);
        }),
      );
    });
  }

  shuffleNews = news => {
    let count = 0;
    const randomNews = [];
    news.map((article, index) => {
      if (count !== 3 && index - count > 2) {
        count++;
        randomNews.push(article);
      } else if (count !== 3 && Math.random() < 0.5) {
        count++;
        randomNews.push(article);
      }
    });
    return randomNews;
  };

  render() {
    const { news } = this.state;
    return (
      <ExploreWrapper news={news}>
        <h4>Your interest</h4>
        <List>
          <Item />
          <Item />
          <Item />
        </List>
        <h4>Recently Popular</h4>
        <List>
          <Item />
          <Item />
          <Item />
        </List>
      </ExploreWrapper>
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
)(ExploreContainer);
