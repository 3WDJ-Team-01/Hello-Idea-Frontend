import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import RepositoryContainer from 'containers/RepositoryContainer';

const Main = ({ match, history }) => {
  return (
    <PageTemplate history={history}>
      <RepositoryContainer
        authorId={parseInt(match.params.author, 10)}
        menu={match.url.split('/')[5]}
        url={match.url}
        repositoryId={parseInt(match.params.repository, 10)}
        history={history}
      />
    </PageTemplate>
  );
};

export default Main;
