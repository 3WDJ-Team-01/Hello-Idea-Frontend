/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
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

  handleIdeaDrop = e => {
    e.stopPropagation();
    e.persist();
    const { getPointFromEvent } = this;
    const { results } = this.props.explore;
    const forkedIdeaId = e.dataTransfer.getData('text');
    const forkedIdea = results.reduce((res, list) => {
      const resultIndex = list.Idea.findIndex(
        item => item.idea_id === parseInt(forkedIdeaId, 10),
      );
      if (resultIndex) return list.Idea[resultIndex];
    });
    const pointerPosition = getPointFromEvent(e);
    console.log(forkedIdea);
    // const newNode = {
    //   project_id: repositoryId,
    //   user_id: userId,
    //   childOf: 0,
    //   isForked: 0,
    //   isEditing: true,
    //   color: '#ECF0F1',
    //   location: {
    //     x: pointer.prevLoc.x,
    //     y: pointer.prevLoc.y,
    //   },
    //   size: {
    //     width: 100,
    //     height: 40,
    //   },
    //   head: '',
    //   parentOf: [],
    // };
  };

  render() {
    const { cavasPins, children, zoom, handleMouseWheel } = this.props;
    const {
      handlePointerDown,
      handlePointerUp,
      handlePointerMove,
      handleIdeaDrop,
    } = this;
    return (
      <Canvas
        cavasPins={cavasPins}
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
