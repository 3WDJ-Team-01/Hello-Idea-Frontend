/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import Nav from 'components/search/Nav';
import SearchWrapper from 'components/search/SearchWrapper';
import Results from 'components/search/Results';
import produce from 'immer';

class SearchContainer extends Component {
  state = {
    type: 'repositories',
  };

  handleType = e => {
    this.setState(
      produce(this.state, draft => {
        draft.type = e.currentTarget.id;
      }),
    );
  };

  render() {
    const { url, user } = this.props;
    const { type } = this.state;
    const { handleType } = this;

    return (
      <SearchWrapper>
        <Nav url={url} user={user} type={type} handleType={handleType} />
        <Results type={type} />
      </SearchWrapper>
    );
  }
}

export default SearchContainer;
