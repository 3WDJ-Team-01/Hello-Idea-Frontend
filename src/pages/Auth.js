import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import AuthContainer from 'containers/AuthContainer';

const Auth = ({ match }) => {
  return (
    <PageTemplate isHidden>
      <AuthContainer kind={match.url.split('/')[2]} />
    </PageTemplate>
  );
};

export default Auth;
