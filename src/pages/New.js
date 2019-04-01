import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import NewContainer from 'containers/NewContainer';

const Main = ({ match }) => {
  return (
    <PageTemplate>
      <NewContainer user={match.params.user} url={match.url} />
    </PageTemplate>
  );
};

export default Main;
