import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import EditorContainer from 'containers/EditorContainer';

const Main = ({ match }) => {
  const category = match.url.split('/')[4];

  return (
    <PageTemplate isHidden>
      <EditorContainer
        userId={match.params.user}
        url={match.url}
        repositoryId={match.params.repository}
      />
    </PageTemplate>
  );
};

export default Main;
