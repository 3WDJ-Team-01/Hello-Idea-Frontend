/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as exploreActions from 'store/modules/explore';
import * as recommendActions from 'store/modules/recommend';
import produce from 'immer';
import ExploreWrapper from 'components/explore/ExploreWrapper';
import List from 'components/explore/List';
import Item from 'components/explore/Item';

class ExploreContainer extends Component {
  state = {
    news: [],
    recommendsTendency: [],
    recommendsPopular: [],
  };

  componentDidMount() {
    const { ExploreActions, RecommendActions } = this.props;
    const { shuffleNews } = this;
    ExploreActions.crawlingRequest().then(() => {
      this.setState(
        produce(draft => {
          const { news } = this.props;
          draft.news = shuffleNews(news);
        }),
      );
    });
    if (localStorage.getItem('userInfo')) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      RecommendActions.withTendencyRequest(userInfo.user_id).then(() => {
        this.setState(
          produce(draft => {
            const { recommendsTendency } = this.props;
            draft.recommendsTendency = recommendsTendency;
          }),
        );
      });
      RecommendActions.withPopularRequest().then(() => {
        this.setState(
          produce(draft => {
            const { recommendsPopular } = this.props;
            draft.recommendsPopular = recommendsPopular;
          }),
        );
      });
    }
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
    const { news, recommendsTendency, recommendsPopular } = this.state;
    return (
      <ExploreWrapper news={news}>
        <List title="Your interest">
          {recommendsTendency.map((item, i) => (
            <Item
              user_id={item.user_id}
              group_id={item.group_id}
              project_img={item.project_img}
              project_id={item.project_id}
              project_topic={item.project_topic}
            />
          ))}
        </List>
        <List title="Recently Popular">
          {recommendsPopular.map((item, i) => (
            <Item
              user_id={item.user_id}
              group_id={item.group_id}
              project_img={item.project_img}
              project_id={item.project_id}
              project_topic={item.project_topic}
            />
          ))}
        </List>
      </ExploreWrapper>
    );
  }
}

const mapStateToProps = state => ({
  state: state.explore.state,
  error: state.explore.error,
  news: state.explore.news,
  recommendsTendency: state.recommend.tendency,
  recommendsPopular: state.recommend.popular,
});

const mapDispatchToProps = dispatch => ({
  ExploreActions: bindActionCreators(exploreActions, dispatch),
  RecommendActions: bindActionCreators(recommendActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExploreContainer);
