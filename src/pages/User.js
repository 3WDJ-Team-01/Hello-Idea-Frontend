import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import UserContainer from 'containers/UserContainer';

const Auth = ({ match, history }) => {
  return (
    <PageTemplate history={history}>
      <UserContainer
        user={parseInt(match.params.user, 10)}
        menu={match.url.split('/')[3]}
        url={match.url}
      />
    </PageTemplate>
  );
};

export default Auth;
