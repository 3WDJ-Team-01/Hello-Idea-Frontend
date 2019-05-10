/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-multi-assign */
/* eslint-disable no-cond-assign */
/* eslint-disable no-else-return */
/* eslint-disable no-shadow */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Node from 'components/mindmap/Node/SVG';

class NodeContainer extends Component {
  constructor(props) {
    super(props);
    const { item } = this.props;

    this.state = {
      node: {
        ...item,
      },
    };
  }

  render() {
    const { node } = this.state;
    const { pointer } = this.props;
    return (
      <Node
        index={node.id}
        head={node.head}
        location={node.location}
        size={node.size}
        color={node.color}
        pointer={pointer}
        isForked={node.isForked}
      />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NodeContainer);
