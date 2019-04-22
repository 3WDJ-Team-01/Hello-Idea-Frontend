import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import TrendsContainer from 'containers/TrendsContainer';

const Auth = ({ match, history }) => {
  return (
    <PageTemplate history={history}>
      <TrendsContainer searchTo={match.params.searchTo} url={match.url} />
    </PageTemplate>
  );
};

export default Auth;
