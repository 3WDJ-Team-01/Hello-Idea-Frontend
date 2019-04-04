import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import SearchContainer from 'containers/SearchContainer';

const Search = ({ match }) => {
  return (
    <PageTemplate>
      <SearchContainer searchTo={match.params.searchTo} url={match.url} />
    </PageTemplate>
  );
};

export default Search;
