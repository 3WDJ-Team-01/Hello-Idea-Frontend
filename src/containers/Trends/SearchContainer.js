/* eslint-disable no-else-return */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import Search from 'components/trends/Search';
import produce from 'immer';
import axios from 'axios';

class SearchContainer extends Component {
  state = {
    state: '',
    keyword: '',
    recentlyKeywords: [],
  };

  componentDidMount() {
    const { loadRecentlyKeywords } = this;

    loadRecentlyKeywords();
  }

  loadRecentlyKeywords = () => {
    axios.get('/api/keyword/recently/').then(res =>
      this.setState(
        produce(draft => {
          draft.state = 'success';
          draft.recentlyKeywords = res.data;
        }),
      ),
    );
  };

  handleKeyword = e => {
    e.persist();

    this.setState(
      produce(draft => {
        draft.keyword = e.target.value;
      }),
    );
  };

  handleSearch = e => {
    e.persist();
    const { history } = this.props;
    const { keyword } = this.state;
    const { user_id } = JSON.parse(localStorage.getItem('userInfo'));

    if (e.target.innerText) {
      axios.post('/api/search/log/create/', {
        user_id,
        keyword: e.target.innerText,
      });
    } else {
      axios.post('/api/search/log/create/', { user_id, keyword });

      history.push(`/trends/${keyword}`);
    }
  };

  render() {
    const { handleKeyword, handleSearch } = this;
    const { state, keyword, recentlyKeywords } = this.state;

    return (
      <Search
        state={state}
        keyword={keyword}
        recentlyKeywords={recentlyKeywords}
        handleKeyword={handleKeyword}
        handleSearch={handleSearch}
      />
    );
  }
}

export default SearchContainer;
