/* eslint-disable no-else-return */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import Search from 'components/trends/Search';
import Results from 'components/trends/Results';
import produce from 'immer';
import axios from 'axios';

class TrendsContainer extends Component {
  state = {
    attention: [],
    log: {
      Search_gender: {},
      Search_age: {},
    },
    relate: {
      related_topic: [],
      related_search: [],
    },
  };

  componentDidMount() {
    const { loadAttention, loadLog, loadRelate } = this;
    const { searchTo } = this.props;
    const { user_id } = JSON.parse(localStorage.getItem('userInfo'));

    loadAttention(searchTo);
    loadLog(searchTo);
    loadRelate(searchTo);
  }

  loadAttention = keyword => {
    axios.post('/api/keyword/attention/', { keyword }).then(res =>
      this.setState(
        produce(draft => {
          draft.attention = res.data;
        }),
      ),
    );
  };

  loadLog = keyword => {
    axios.post('/api/search/log/view/', { keyword }).then(res =>
      this.setState(
        produce(draft => {
          draft.log = res.data;
        }),
      ),
    );
  };

  loadRelate = idea_keyword => {
    axios.post('/api/keyword/relate/', { idea_keyword }).then(res =>
      this.setState(
        produce(draft => {
          draft.relate = res.data;
        }),
      ),
    );
  };

  render() {
    const { handleKeyword, handleSearch } = this;
    const { attention, log, relate } = this.state;
    const { url, searchTo } = this.props;

    return (
      <Results
        keyword={searchTo}
        attention={attention}
        log={log}
        relate={relate}
      />
    );
  }
}

export default TrendsContainer;
