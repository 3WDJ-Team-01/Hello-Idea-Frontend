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
import * as mindmapActions from 'store/modules/mindmap';
import * as alertActions from 'store/modules/alert';
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
    } else if (
      pointer.target.nodeId !== 0 &&
      (pointer.target.class === 'node' || pointer.target.class === 'forked')
    ) {
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
      (pointer.target.class === 'node' || pointer.target.class === 'forked')
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
    const {
      nodes,
      pointer,
      MindmapActions,
      AlertActions,
      loggedUserFollowers,
      userId,
      repositoryId,
    } = this.props;
    const targetNodeId = pointer.target.nodeId ? pointer.target.nodeId : 0;
    const { ideas } = this.props.explore;
    const pointerPosition = getPointFromEvent(e);
    const forkedIdeaId = e.dataTransfer.getData('text');
    const forkedIdea =
      ideas[
        ideas.findIndex(idea => idea.idea_id === parseInt(forkedIdeaId, 10))
      ];

    const strByteLength = (s, b, i, c) => {
      for (
        b = i = 0;
        (c = s.charCodeAt(i++));
        b += c >> 11 ? 3 : c >> 7 ? 2 : 1
      );
      return b;
    };

    const nodeIndex = nodes.findIndex(item => item.id === targetNodeId);

    const newNode = {
      project_id: repositoryId,
      user_id: userId,
      childOf: targetNodeId,
      isForked: forkedIdea.idea_id,
      isEditing: false,
      color: nodes[nodeIndex > 0 ? nodeIndex : 0].color,
      location: {
        x: pointerPosition.x,
        y: pointerPosition.y,
      },
      size: {
        width: strByteLength(forkedIdea.idea_cont) * 8 + 30,
        height: 40,
      },
      head: forkedIdea.idea_cont,
      parentOf: [],
    };
    MindmapActions.createIdeaRequest(newNode);
    AlertActions.sendNotify({
      type: 'fork',
      send_id: userId,
      receive_id: [forkedIdea.user_id],
      target_id: repositoryId,
    });
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
  loggedUserFollowers: state.auth.relation.followersId,
});

const mapDispatchToProps = dispatch => ({
  MindmapActions: bindActionCreators(mindmapActions, dispatch),
  AlertActions: bindActionCreators(alertActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CanvasContainer);
