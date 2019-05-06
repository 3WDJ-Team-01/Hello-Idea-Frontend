import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import EditorContainer from 'containers/EditorContainer';
import ViewerContainer from 'containers/ViewerContainer';

const Main = ({ match, history }) => {
  if (match.url.split('/')[5] === 'editor')
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
  return (
    <PageTemplate isHidden>
      <ViewerContainer
        history={history}
        author={parseInt(match.params.author, 10)}
        url={match.url}
        repositoryId={parseInt(match.params.repository, 10)}
      />
    </PageTemplate>
  );
};

export default Main;
