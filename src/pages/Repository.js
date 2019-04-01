import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import RepositoryContainer from 'containers/RepositoryContainer';

const Main = ({ match }) => {
  return (
    <PageTemplate>
      <RepositoryContainer
        user={match.params.user}
        url={match.url}
        repository={match.params.repository}
      />
    </PageTemplate>
  );
};

export default Main;
