import React, { Component } from 'react';
import UserWrapper from 'components/user/UserWrapper';
import Header from 'components/user/Header';
import Overview from 'components/user/Overview';
import Repositories from 'components/user/Repositories';
import Followers from 'components/user/Followers';
import Followings from 'components/user/Followings';

class UserContainer extends Component {
  render() {
    const { user, url } = this.props;
    return (
      <>
        <Header />
        <UserWrapper
          url={url}
          Overview={Overview}
          Repositories={Repositories}
          Followers={Followers}
          Followings={Followings}
        />
      </>
    );
  }
}

export default UserContainer;
