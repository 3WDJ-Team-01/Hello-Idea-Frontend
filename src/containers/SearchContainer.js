/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import Nav from 'components/search/Nav';
import SearchWrapper from 'components/search/SearchWrapper';
import Results from 'components/search/Results';
import produce from 'immer';
import axios from 'axios';

class SearchContainer extends Component {
  state = {
    type: 'Repositories',
    results: {
      Repositories: [],
      Users: [],
      Groups: [],
      Keywords: [],
    },
  };

  componentDidMount() {
    const { searchTo } = this.props;
    const { user_id } = JSON.parse(localStorage.getItem('userInfo'));

    axios.post('/api/search/', { searchTo }).then(res =>
      this.setState(
        produce(draft => {
          draft.results.Repositories = res.data.repositories;
          draft.results.Users = res.data.users;
          draft.results.Groups = res.data.groups;
        }),
      ),
    );
    axios.post('/api/search/log/create/', { user_id, keyword: searchTo });
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchTo } = this.props;

    if (prevProps.searchTo !== searchTo)
      axios.post('/api/search/', { searchTo }).then(res =>
        this.setState(
          produce(draft => {
            draft.results.Repositories = res.data.repositories;
            draft.results.Users = res.data.users;
            draft.results.Groups = res.data.groups;
          }),
        ),
      );
  }

  handleType = e => {
    this.setState(
      produce(this.state, draft => {
        draft.type = e.target.attributes.name.nodeValue;
      }),
    );
  };

  render() {
    const { type, results } = this.state;
    const { handleType } = this;

    return (
      <SearchWrapper>
        <Nav
          type={type}
          typeList={Object.keys(results)}
          handleType={handleType}
        />
        <Results type={type} results={results} />
      </SearchWrapper>
    );
  }
}

export default SearchContainer;
