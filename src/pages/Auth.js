import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import AuthContainer from 'containers/AuthContainer';

const Auth = ({ match }) => {
  return (
    <PageTemplate isHidden>
      <AuthContainer kind={match.params.kind} />
    </PageTemplate>
  );
};

export default Auth;
