import React, { Component } from 'react';
import ExploreWrapper from 'components/explore/ExploreWrapper';
import List from 'components/explore/List';
import Item from 'components/explore/Item';

class ExploreContainer extends Component {
  render() {
    return (
      <ExploreWrapper>
        <h4>Your interest</h4>
        <List>
          <Item />
          <Item />
          <Item />
        </List>
        <h4>Recently Popular</h4>
        <List>
          <Item />
          <Item />
          <Item />
        </List>
      </ExploreWrapper>
    );
  }
}

export default ExploreContainer;
