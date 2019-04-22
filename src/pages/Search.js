import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import SearchContainer from 'containers/SearchContainer';

const Search = ({ match, history }) => {
  return (
    <PageTemplate history={history}>
      <SearchContainer searchTo={match.params.searchTo} url={match.url} />
    </PageTemplate>
  );
};

export default Search;
