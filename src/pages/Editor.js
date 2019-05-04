import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import EditorContainer from 'containers/EditorContainer';

const Main = ({ match, history }) => {
  return (
    <PageTemplate isHidden>
      <EditorContainer
        history={history}
        author={parseInt(match.params.author, 10)}
        url={match.url}
        repositoryId={parseInt(match.params.repository, 10)}
      />
    </PageTemplate>
  );
};

export default Main;
