/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-bitwise */
/* eslint-disable no-multi-assign */
/* eslint-disable no-cond-assign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Canvas from 'components/mindmap/Canvas';

class CanvasContainer extends Component {
  getPointFromEvent = e => {
    e.persist();

    const { svg } = this.props.pointer;
    const { getLocationFromEvent } = this.props;

    const invertedSVGMatrix = svg.getScreenCTM().inverse();
    return getLocationFromEvent(e).matrixTransform(invertedSVGMatrix);
  };

  handlePointerDown = e => {
    const { getPointFromEvent } = this;
    const { setPrevLoc, pointerDown } = this.props;
    e.persist();
    console.log('down');
    setPrevLoc(getPointFromEvent(e));
    pointerDown(e);
  };

  handlePointerMove = e => {
    const { getPointFromEvent } = this;
    const {
      pointer,
      pointerMove,
      MindmapActions,
      setViewBoxLocation,
    } = this.props;
    if (!pointer.state.isDown || e.target.contentEditable) return;
    console.log('move');

    e.preventDefault();
    pointerMove();

    const pointerPosition = getPointFromEvent(e);
    if (pointer.target.class === 'canvas') {
      setViewBoxLocation({
        x: pointerPosition.x - pointer.prevLoc.x,
        y: pointerPosition.y - pointer.prevLoc.y,
      });
    }
  };

  handlePointerUp = e => {
    const { getPointFromEvent } = this;
    const { pointer, nodes, pointerUp } = this.props;
    const pointerPosition = getPointFromEvent(e);
    console.log('up');
    pointerUp();
  };

  render() {
    const { cavasPins, children, zoom, handleMouseWheel } = this.props;
    const { handlePointerDown, handlePointerUp, handlePointerMove } = this;
    return (
      <Canvas
        cavasPins={cavasPins}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onWheel={handleMouseWheel}
        zoom={zoom}
      >
        {children}
      </Canvas>
    );
  }
}

const mapStateToProps = state => ({
  cavasPins: state.mindmap.cavasPins,
  nodes: state.mindmap.nodes,
  loggedUserFollowers: state.auth.relation.followersId,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CanvasContainer);
