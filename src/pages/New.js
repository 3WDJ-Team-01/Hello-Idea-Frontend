import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import NewContainer from 'containers/NewContainer';

const Main = ({ match, history }) => {
  return (
    <PageTemplate history={history}>
      <NewContainer
        user={parseInt(match.params.user, 10)}
        url={match.url}
        history={history}
      />
    </PageTemplate>
  );
};

export default Main;
