import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import SearchContainer from 'containers/Trends/SearchContainer';
import ResultsContainer from 'containers/Trends/ResultsContainer';

const Auth = ({ match, history }) => {
  const { searchTo } = match.params;
  return (
    <PageTemplate history={history} bgColor="#fafafa">
      {searchTo ? (
        <ResultsContainer
          history={history}
          searchTo={searchTo}
          url={match.url}
        />
      ) : (
        <SearchContainer history={history} url={match.url} />
      )}
    </PageTemplate>
  );
};

export default Auth;
