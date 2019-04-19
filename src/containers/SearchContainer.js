/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import Nav from 'components/search/Nav';
import SearchWrapper from 'components/search/SearchWrapper';
import Results from 'components/search/Results';
import produce from 'immer';
import axios from 'axios';

class SearchContainer extends Component {
  state = {
    type: 'repositories',
    results: {
      repositories: [],
      users: [],
      groups: [],
    },
  };

  componentDidMount() {
    const { searchTo } = this.props;
    axios.post('/api/search/', { searchTo }).then(res =>
      this.setState(
        produce(draft => {
          draft.results = res.data;
        }),
      ),
    );
  }

  handleType = e => {
    this.setState(
      produce(this.state, draft => {
        draft.type = e.currentTarget.id;
      }),
    );
  };

  render() {
    const { url, user } = this.props;
    const { type, results } = this.state;
    const { handleType } = this;

    return (
      <SearchWrapper>
        <Nav url={url} user={user} type={type} handleType={handleType} />
        <Results type={type} results={results} />
      </SearchWrapper>
    );
  }
}

export default SearchContainer;
