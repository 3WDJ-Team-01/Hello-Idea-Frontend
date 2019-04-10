import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import GroupContainer from 'containers/GroupContainer';

const Main = ({ match }) => {
  return (
    <PageTemplate>
      <GroupContainer user={match.params.user} url={match.url} />
    </PageTemplate>
  );
};

export default Main;
