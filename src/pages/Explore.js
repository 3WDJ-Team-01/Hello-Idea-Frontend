import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import ExploreContainer from 'containers/ExploreContainer';

const Main = ({ match, history }) => {
  const category = match.url.split('/')[4];
  return (
    <PageTemplate history={history}>
      <ExploreContainer />
    </PageTemplate>
  );
};

export default Main;
