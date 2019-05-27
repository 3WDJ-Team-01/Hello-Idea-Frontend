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
import produce from 'immer';
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
      changedSize: {
        width: 0,
        height: 0,
      },
      pins: canvasPins,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { canvasPins } = nextProps;
    const { originSize } = prevState;
    const changedWidth = canvasPins.rightBottom.x - canvasPins.leftTop.x;
    const changedHeight = canvasPins.rightBottom.y - canvasPins.leftTop.y;

    if (prevState.canvasPins !== nextProps.canvasPins) {
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
    const { setPrevLoc, pointerDown, toggleContextMenu } = this.props;
    e.persist();
    setPrevLoc(getPointFromEvent(e));
    pointerDown(e);
    toggleContextMenu(e);
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

    e.preventDefault();
    pointerMove();

    const pointerPosition = getPointFromEvent(e);
    const changedLocX = pointerPosition.x - pointer.prevLoc.x;
    const changedLocY = pointerPosition.y - pointer.prevLoc.y;

    if (pointer.target.class === 'canvas') {
      setViewBoxLocation({
        x: changedLocX,
        y: changedLocY,
      });
      this.setState(
        produce(draft => {
          draft.changedSize.width += changedLocX;
          draft.changedSize.height += changedLocY;
          draft.pins.leftTop.x -= changedLocX;
          draft.pins.leftTop.y -= changedLocY;
        }),
      );
    }
  };

  handlePointerUp = e => {
    const { getPointFromEvent } = this;
    const { changedSize } = this.state;
    const { pointer, nodes, pointerUp, MindmapActions } = this.props;
    const pointerPosition = getPointFromEvent(e);

    if (pointer.target.class === 'canvas') {
      const { width, height } = changedSize;
      this.setState(
        produce(draft => {
          draft.originSize.width += Math.abs(width);
          draft.originSize.height += Math.abs(height);
        }),
      );
    }
    pointerUp();
  };

  render() {
    const {
      handlePointerDown,
      handlePointerUp,
      handlePointerMove,
      handleIdeaDrop,
    } = this;
    const { children, zoom, handleMouseWheel } = this.props;
    const { originSize, changedSize, pins } = this.state;

    return (
      <Canvas
        originSize={originSize}
        changedSize={changedSize}
        pins={pins}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onWheel={handleMouseWheel}
        onDrop={handleIdeaDrop}
        zoom={zoom}
      >
        {children}
      </Canvas>
    );
  }
}

const mapStateToProps = state => ({
  canvasPins: state.mindmap.canvasPins,
  nodes: state.mindmap.nodes,
  loggedUserFollowers: state.auth.relation.followersId,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CanvasContainer);
