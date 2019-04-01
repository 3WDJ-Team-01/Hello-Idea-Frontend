import React from 'react';
import PageTemplate from '../components/base/PageTemplate';
import MainContainer from '../containers/MainContainer';

const Main = ({ match }) => {
  return (
    <PageTemplate>
      <MainContainer url={match.url} />
    </PageTemplate>
  );
};

export default Main;
