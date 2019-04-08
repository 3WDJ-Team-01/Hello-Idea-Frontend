import React, { Component } from 'react';
import UserWrapper from 'components/user/UserWrapper';
import Header from 'components/user/Header';
import Overview from 'components/user/Overview';
import Repositories from 'components/user/Repositories';
import Following from 'components/user/Following';
import Modify from 'components/user/Modify';

class UserContainer extends Component {
  renderMenu = menu => {
    switch (menu) {
      case 'repositories':
        return <Repositories />;
      case 'followers':
        return <Following />;
      case 'followings':
        return <Following />;
      case 'modify':
        return <Modify />;
      default:
        return <Overview />;
    }
  };

  render() {
    const { renderMenu } = this;
    const { user, menu, url } = this.props;
    return (
      <>
        <Header url={url} user={user} />
        <UserWrapper>{renderMenu(menu)}</UserWrapper>
      </>
    );
  }
}

export default UserContainer;
