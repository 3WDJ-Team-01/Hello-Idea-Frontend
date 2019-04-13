import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import RepositoryContainer from 'containers/RepositoryContainer';

const Main = ({ match, history }) => {
  return (
    <PageTemplate>
      <RepositoryContainer
        userId={match.params.user}
        menu={match.params.menu}
        url={match.url}
        repositoryId={match.params.repository}
        history={history}
      />
    </PageTemplate>
  );
};

export default Main;
