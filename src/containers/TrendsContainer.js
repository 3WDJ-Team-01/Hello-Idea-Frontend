/* eslint-disable no-else-return */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import Search from 'components/trends/Search';
import Results from 'components/trends/Results';

class TrendsContainer extends Component {
  render() {
    const { url, searchTo } = this.props;

    if (!searchTo) return <Search />;
    else return <Results searchTo={searchTo} />;
  }
}

export default TrendsContainer;
