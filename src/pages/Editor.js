import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import EditorContainer from 'containers/EditorContainer';

const Main = ({ match, history }) => {
  return (
    <PageTemplate isHidden>
      <EditorContainer
        history={history}
        author={match.params.author}
        url={match.url}
        repositoryId={match.params.repository}
      />
    </PageTemplate>
  );
};

export default Main;
