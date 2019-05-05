/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as exploreActions from 'store/modules/explore';
import * as recommendActions from 'store/modules/recommend';
import produce from 'immer';
import ProgressIndicator from 'components/base/ProgressIndicator';
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
    const { loggedUserId, ExploreActions, RecommendActions } = this.props;
    const { shuffleNews } = this;
    ExploreActions.crawlingRequest().then(() => {
      this.setState(
        produce(draft => {
          const { news } = this.props;
          draft.news = shuffleNews(news);
        }),
      );
    });

    if (loggedUserId) {
      RecommendActions.withTendencyRequest(loggedUserId).then(() => {
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

  componentDidUpdate(prevProps, prevState) {
    const { loggedUserId, RecommendActions } = this.props;

    if (prevProps.loggedUserId !== loggedUserId) {
      RecommendActions.withTendencyRequest(loggedUserId).then(() => {
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
    const { authState, exploreState, recommendState } = this.props;
    const { news, recommendsTendency, recommendsPopular } = this.state;
    if (
      authState === 'success' &&
      exploreState === 'success' &&
      recommendState.tendency === 'success' &&
      recommendState.popular === 'success'
    )
      return (
        <ExploreWrapper news={news}>
          <List title="Your interest">
            {recommendsTendency.map((item, i) => (
              <Item
                key={i}
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
                key={i}
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
    return <ProgressIndicator />;
  }
}

const mapStateToProps = state => ({
  authState: state.auth.state,
  loggedUserId: state.auth.userInfo.user_id,
  exploreState: state.explore.state,
  recommendState: state.recommend.state,
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
