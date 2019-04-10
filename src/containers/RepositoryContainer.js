import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from 'components/repository/Header';
import RepositoryWrapper from 'components/repository/RepositoryWrapper';
import Overview from 'components/repository/Overview';
import Setting from 'components/repository/Setting';

class RepositoryContainer extends Component {
  renderMenu = menu => {
    const { repository } = this.props;

    switch (menu) {
      case 'settings':
        return <Setting />;
      default:
        return <Overview repository={repository} />;
    }
  };

  render() {
    const { renderMenu } = this;
    const { url, user, menu } = this.props;

    return (
      <>
        <Header url={url} user={user} menu={menu} />
        <RepositoryWrapper>{renderMenu(menu)}</RepositoryWrapper>
      </>
    );
  }
}

export default RepositoryContainer;
