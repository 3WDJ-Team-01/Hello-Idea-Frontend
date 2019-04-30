/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mindmapActions from 'store/modules/mindmap';
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
    if (pointer.target.class === 'canvas') {
      setViewBoxLocation({
        x: pointerPosition.x - pointer.prevLoc.x,
        y: pointerPosition.y - pointer.prevLoc.y,
      });
    } else if (pointer.target.nodeId !== 0 && pointer.target.class === 'node') {
      MindmapActions.setNodeLocation({
        id: pointer.target.nodeId,
        location: {
          x: pointerPosition.x,
          y: pointerPosition.y,
        },
      });
    }
  };

  handlePointerUp = e => {
    const { getPointFromEvent } = this;
    const { pointer, nodes, pointerUp, MindmapActions } = this.props;

    const pointerPosition = getPointFromEvent(e);
    if (
      pointer.target.nodeId !== 0 &&
      pointer.state.isDrag &&
      pointer.target.class === 'node'
    ) {
      const index = nodes.findIndex(node => node.id === pointer.target.nodeId);

      MindmapActions.updateIdeaRequest({
        id: nodes[index].id,
        color: nodes[index].color,
        location: {
          x: pointerPosition.x,
          y: pointerPosition.y,
        },
        size: nodes[index].size,
      });
    }
    pointerUp();
  };

  render() {
    const { cavasPins, children, zoom } = this.props;
    const { handlePointerDown, handlePointerUp, handlePointerMove } = this;
    return (
      <Canvas
        cavasPins={cavasPins}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
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
});

const mapDispatchToProps = dispatch => ({
  // mindmap modules
  MindmapActions: bindActionCreators(mindmapActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CanvasContainer);
