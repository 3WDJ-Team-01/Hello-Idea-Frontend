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
import Canvas from 'components/mindmap/Canvas';

class CanvasContainer extends Component {
  constructor(props) {
    super(props);
    const { canvasPins } = props;

    this.state = {
      originSize: {
        width: window.screen.width,
        height: window.screen.height,
      },
      pins: canvasPins,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.canvasPins !== nextProps.canvasPins) {
      const { canvasPins } = nextProps;
      const { originSize } = prevState;
      const changedWidth = canvasPins.rightBottom.x - canvasPins.leftTop.x;
      const changedHeight = canvasPins.rightBottom.y - canvasPins.leftTop.y;
      return {
        originSize: {
          width:
            changedWidth > window.screen.width
              ? changedWidth
              : originSize.width,
          height:
            changedHeight > window.screen.height
              ? changedHeight
              : originSize.height,
        },
      };
    }

    return null;
  }

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
    setPrevLoc(getPointFromEvent(e));
    pointerDown(e);
  };

  handlePointerMove = e => {
    const { getPointFromEvent } = this;
    const { pointer, pointerMove, setViewBoxLocation } = this.props;
    if (!pointer.state.isDown || e.target.contentEditable) return;

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
    const { pointerUp } = this.props;
    pointerUp();
  };

  render() {
    const { handlePointerDown, handlePointerUp, handlePointerMove } = this;
    const { children, zoom, handleMouseWheel } = this.props;
    const { originSize, pins } = this.state;
    return (
      <Canvas
        originSize={originSize}
        pins={pins}
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
