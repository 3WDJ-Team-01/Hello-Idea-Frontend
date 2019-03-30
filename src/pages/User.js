import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import UserContainer from 'containers/UserContainer';

const Auth = ({ match }) => {
  return (
    <PageTemplate>
      <UserContainer user={match.params.user} url={match.url} />
    </PageTemplate>
  );
};

export default Auth;
