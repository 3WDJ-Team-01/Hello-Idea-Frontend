import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import TrendsContainer from 'containers/TrendsContainer';

const Auth = ({ match }) => {
  return (
    <PageTemplate>
      <TrendsContainer searchTo={match.params.searchTo} url={match.url} />
    </PageTemplate>
  );
};

export default Auth;
