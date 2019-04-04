import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import UserContainer from 'containers/UserContainer';

const Auth = ({ match }) => {
  return (
    <PageTemplate>
      <UserContainer
        user={match.params.user}
        menu={match.params.menu}
        url={match.url}
      />
    </PageTemplate>
  );
};

export default Auth;
