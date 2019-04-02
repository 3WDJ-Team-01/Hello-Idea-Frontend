/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getNodes, getPaths, setNodeLocation } from 'store/modules/mindmap';
import Canvas from 'components/mindmap/Canvas';
import produce from 'immer';

class CanvasContainer extends Component {
  state = {
    canvas: {
      viewBox: 0,
      display: {
        width: 5760,
        height: 3240,
        zoom: 1,
      },
    },
  };

  componentDidMount() {
    const { setViewBoxBaseVal } = this;
    setViewBoxBaseVal(document.querySelector('#canvas'));
  }

  setViewBoxBaseVal = svg => {
    this.setState(
      produce(draft => {
        draft.viewBox = svg.viewBox.baseVal;
      }),
    );
  };

  setViewBoxLocation = distance => {
    this.setState(
      produce(draft => {
        draft.viewBox.x -= distance.x;
        draft.viewBox.y -= distance.y;
      }),
    );
  };

  getPointFromEvent = e => {
    e.persist();

    const { svg, currLoc } = this.props.pointer;
    const { getLocationFromEvent } = this.props;

    getLocationFromEvent(e);
    const invertedSVGMatrix = svg.getScreenCTM().inverse();
    return currLoc.matrixTransform(invertedSVGMatrix);
  };

  handlePointerDown = e => {
    const { getPointFromEvent } = this;
    const { setPrevLoc, pointerDown, toggleContextMenu } = this.props;

    setPrevLoc(getPointFromEvent(e));
    toggleContextMenu(e);
  };

  handlePointerMove = e => {
    const { getPointFromEvent, setViewBoxLocation } = this;
    const { pointer, pointerMove, setNodeLocation } = this.props;

    e.preventDefault();
    pointerMove();

    const pointerPosition = getPointFromEvent(e);
    if (pointer.target.class === 'canvas') {
      setViewBoxLocation({
        x: pointerPosition.x - pointer.prevLoc.x,
        y: pointerPosition.y - pointer.prevLoc.y,
      });
    } else if (pointer.target.class === 'node') {
      setNodeLocation({
        id: pointer.target.nodeId,
        location: {
          x: pointerPosition.x,
          y: pointerPosition.y,
        },
      });
    }
  };

  handlePointerUp = e => {
    const { pointerUp } = this.props;

    pointerUp();
  };

  render() {
    const { canvas } = this.state;
    const { children } = this.props;
    const { handlePointerDown, handlePointerUp, handlePointerMove } = this;

    return (
      <Canvas
        width={canvas.display.width}
        height={canvas.display.height}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        style={{
          transform: `scale(${canvas.display.zoom})`,
        }}
      >
        {children}
      </Canvas>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  // mindmap modules
  setNodeLocation: node => dispatch(setNodeLocation(node)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CanvasContainer);
