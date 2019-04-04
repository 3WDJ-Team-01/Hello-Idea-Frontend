import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import UserWrapper from 'components/user/UserWrapper';
import Header from 'components/user/Header';
import Overview from 'components/user/Overview';
import Repositories from 'components/user/Repositories';
import Following from 'components/user/Following';
import Modify from 'components/user/Modify';

class UserContainer extends Component {
  render() {
    const { user, menu, url } = this.props;
    return (
      <>
        <Header url={url} user={user} />
        <UserWrapper>
          <Switch>
            <Route path="/:user/repositories">
              <Repositories />
            </Route>
            <Route path="/:user/followers">
              <Following />
            </Route>
            <Route path="/:user/followings">
              <Following />
            </Route>
            <Route path="/:user/modify">
              <Modify />
            </Route>
            <Route path="/:user" exact>
              <Overview />
            </Route>
          </Switch>
        </UserWrapper>
      </>
    );
  }
}

export default UserContainer;
