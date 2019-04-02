import React, { Component } from 'react';
import Header from 'components/repository/Header';
import RepositoryWrapper from 'components/repository/RepositoryWrapper';
import Overview from 'components/repository/Overview';
import Setting from 'components/repository/Setting';

class SearchContainer extends Component {
  render() {
    const { url, user, repository } = this.props;
    return (
      <>
        <Header url={url} user={user} />
        <RepositoryWrapper
          user={user}
          repository={repository}
          Overview={Overview}
          Setting={Setting}
        />
      </>
    );
  }
}

export default SearchContainer;
