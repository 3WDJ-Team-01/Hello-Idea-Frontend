import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import GroupContainer from 'containers/GroupContainer';

const Main = ({ match, history }) => {
  return (
    <PageTemplate history={history}>
      <GroupContainer user={match.params.user} url={match.url} />
    </PageTemplate>
  );
};

export default Main;
