import React from 'react';
import PageTemplate from '../components/base/PageTemplate';
import AuthContainer from '../containers/AuthContainer';

const Auth = ({ match }) => {
  const { kind } = match.params;

  return (
    <PageTemplate isHidden>
      <AuthContainer kind={kind} />
    </PageTemplate>
  );
};

export default Auth;
