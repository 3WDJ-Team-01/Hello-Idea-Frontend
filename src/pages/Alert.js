import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import AlertContainer from 'containers/AlertContainer';

const Auth = ({ match }) => {
  return (
    <PageTemplate isHidden>
      <AlertContainer />
    </PageTemplate>
  );
};

export default Auth;
