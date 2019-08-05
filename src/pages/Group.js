import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import GroupContainer from 'containers/GroupContainer';

const Main = ({ match, history }) => {
  return (
    <PageTemplate history={history}>
      <GroupContainer
        groupId={parseInt(match.params.group, 10)}
        menu={match.url.split('/')[3]}
        url={match.url}
      />
    </PageTemplate>
  );
};

export default Main;
