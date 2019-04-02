/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {
  setSVG,
  createSVGPoint,
  getLocationFromEvent,
  setPrevLoc,
  pointerUp,
  pointerDown,
  pointerMove,
} from 'store/modules/pointer';
import {
  setViewBoxBaseVal,
  setViewBoxLocation,
  toggleContextMenu,
} from 'store/modules/canvas';
import { getNodes, getPaths, setNodeLocation } from 'store/modules/mindmap';
import Canvas from 'components/mindmap/Canvas';

class CanvasContainer extends Component {
  componentDidMount() {
    const { setSVG, createSVGPoint, setViewBoxBaseVal } = this.props;

    setSVG(ReactDOM.findDOMNode(this));
    createSVGPoint(ReactDOM.findDOMNode(this));
    setViewBoxBaseVal(ReactDOM.findDOMNode(this));
  }

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
    pointerDown(e);
    toggleContextMenu(e);
  };

  handlePointerMove = e => {
    const { getPointFromEvent } = this;
    const {
      pointer,
      setViewBoxLocation,
      pointerMove,
      setNodeLocation,
    } = this.props;

    if (!pointer.state.isDown || e.target.contentEditable) return;

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
    const { canvas, children } = this.props;
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

const mapStateToProps = state => ({
  pointer: state.pointer,
  canvas: state.canvas,
});

const mapDispatchToProps = dispatch => ({
  // pointer modules
  setSVG: svg => dispatch(setSVG(svg)),
  createSVGPoint: svg => dispatch(createSVGPoint(svg)),
  getLocationFromEvent: event => dispatch(getLocationFromEvent(event)),
  setPrevLoc: location => dispatch(setPrevLoc(location)),
  pointerUp: location => dispatch(pointerUp(location)),
  pointerDown: location => dispatch(pointerDown(location)),
  pointerMove: location => dispatch(pointerMove(location)),

  // canvas modules
  setViewBoxBaseVal: svg => dispatch(setViewBoxBaseVal(svg)),
  setViewBoxLocation: distance => dispatch(setViewBoxLocation(distance)),
  toggleContextMenu: event => dispatch(toggleContextMenu(event)),

  // mindmap modules
  getNodes: data => dispatch(getNodes(data)),
  getPaths: path => dispatch(getPaths(path)),
  setNodeLocation: node => dispatch(setNodeLocation(node)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CanvasContainer);
