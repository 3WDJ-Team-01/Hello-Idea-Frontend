import React, { Component } from 'react';
import UserWrapper from 'components/user/UserWrapper';
import Header from 'components/user/Header';
import Overview from 'components/user/Overview';
import Repositories from 'components/user/Repositories';
import Following from 'components/user/Following';
import Modify from 'components/user/Modify';

class UserContainer extends Component {
  render() {
    const { user, url } = this.props;
    return (
      <>
        <Header url={url} user={user} />
        <UserWrapper
          user={user}
          Overview={Overview}
          Repositories={Repositories}
          Following={Following}
          Modify={Modify}
        />
      </>
    );
  }
}

export default UserContainer;
