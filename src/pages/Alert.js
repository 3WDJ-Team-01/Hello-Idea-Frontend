import React from 'react';
import PageTemplate from 'components/base/PageTemplate';
import AlertContainer from 'containers/AlertContainer';

const Auth = ({ match }) => {
  return (
    <PageTemplate isHidden>
      <AlertContainer type={match.url.split('/')[2]} />
    </PageTemplate>
  );
};

export default Auth;
