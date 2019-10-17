/* eslint-disable no-useless-escape */
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
import produce from 'immer';
import * as mindmapActions from 'store/modules/mindmap';
import * as alertActions from 'store/modules/alert';
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

    this.isMobile =
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent,
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        navigator.userAgent.substr(0, 4),
      );
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

    if (this.isMobile) {
      this.touchTimer = setTimeout(() => toggleContextMenu(e, true), 500);
    } else if (e.button === 2) toggleContextMenu(e);
  };

  handlePointerMove = e => {
    const { getPointFromEvent } = this;
    const {
      pointer,
      pointerMove,
      MindmapActions,
      setViewBoxLocation,
    } = this.props;

    if (this.isMobile) {
      clearTimeout(this.touchTimer);
    }

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
    const { changedSize } = this.state;
    const { pointer, nodes, pointerUp, MindmapActions } = this.props;
    const pointerPosition = getPointFromEvent(e);

    if (this.isMobile) {
      clearTimeout(this.touchTimer);
    }

    if (pointer.target.class === 'canvas') {
      const { width, height } = changedSize;
      this.setState(
        produce(draft => {
          draft.originSize.width += Math.abs(width);
          draft.originSize.height += Math.abs(height);
        }),
      );
    }

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
    pointerUp(e);
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

const mapDispatchToProps = dispatch => ({
  MindmapActions: bindActionCreators(mindmapActions, dispatch),
  AlertActions: bindActionCreators(alertActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CanvasContainer);
