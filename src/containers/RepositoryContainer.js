import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from 'components/repository/Header';
import RepositoryWrapper from 'components/repository/RepositoryWrapper';
import Overview from 'components/repository/Overview';
import Setting from 'components/repository/Setting';

class RepositoryContainer extends Component {
  render() {
    const { url, user, repository } = this.props;
    return (
      <>
        <Header url={url} user={user} />
        <RepositoryWrapper>
          <Switch>
            <Route path="/:user/repositories/:repository/settings">
              <Setting />
            </Route>
            <Route path="/:user/repositories/:repository">
              <Overview repository={repository} />
            </Route>
          </Switch>
        </RepositoryWrapper>
      </>
    );
  }
}

export default RepositoryContainer;
