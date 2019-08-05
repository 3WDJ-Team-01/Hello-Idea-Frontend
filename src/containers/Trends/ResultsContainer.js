/* eslint-disable no-else-return */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import Results from 'components/trends/Results';
import produce from 'immer';
import axios from 'axios';

class TrendsContainer extends Component {
  state = {
    state: {
      attention: '',
      log: '',
      relate: '',
    },
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

    loadAttention(searchTo);
    loadLog(searchTo);
    loadRelate(searchTo);
  }

  loadAttention = keyword => {
    axios.post('/api/keyword/attention/', { keyword }).then(res =>
      this.setState(
        produce(draft => {
          draft.state.attention = 'success';
          draft.attention = res.data;
        }),
      ),
    );
  };

  loadLog = keyword => {
    axios.post('/api/search/log/view/', { keyword }).then(res =>
      this.setState(
        produce(draft => {
          draft.state.log = 'success';
          draft.log = res.data;
        }),
      ),
    );
  };

  loadRelate = idea_keyword => {
    axios.post('/api/keyword/relate/', { idea_keyword }).then(res =>
      this.setState(
        produce(draft => {
          draft.state.relate = 'success';
          draft.relate = res.data;
        }),
      ),
    );
  };

  render() {
    const { state, attention, log, relate } = this.state;
    const { searchTo } = this.props;

    return (
      <Results
        state={state}
        keyword={searchTo}
        attention={attention}
        log={log}
        relate={relate}
      />
    );
  }
}

export default TrendsContainer;
