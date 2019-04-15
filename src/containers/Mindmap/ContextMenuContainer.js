/* eslint-disable object-shorthand */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mindmapActions from 'store/modules/mindmap';
import { ChromePicker } from 'react-color';
import produce from 'immer';
// import {
//   addNode,
//   addPath,
//   removeNode,
//   toggleNodeEditing,
//   setNodeData,
// } from 'store/modules/mindmap';

import MenuWrapper from 'components/mindmap/ContextMenu/MenuWrapper';
import MenuItem from 'components/mindmap/ContextMenu/MenuItem';
import MenuLabel from 'components/mindmap/ContextMenu/MenuLabel';
import SVG from 'components/mindmap/ContextMenu/SVG';
import ContextMenuData from 'data/ContextMenu';

class ContextMenuContainer extends Component {
  constructor(props) {
    super(props);

    const { pointer } = this.props;

    this.state = {
      currentMenu: '',
      targetNodeId: pointer.target.nodeId,
      isColorPicker: false,
      color: '#fff',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pointer.target.nodeId !== this.state.targetNodeId) {
      this.setState({ targetNodeId: nextProps.pointer.target.nodeId });
    }
  }

  handleMouseOver = e => {
    this.setState({ currentMenu: e.currentTarget.dataset.label });
  };

  handleMouseOut = e => {
    this.setState({ currentMenu: '' });
  };

  handleChangeComplete = (color, event) => {
    const { MindmapActions, nodes } = this.props;
    const { targetNodeId } = this.state;
    const index = nodes.findIndex(node => node.id === targetNodeId);

    this.setState(
      produce(draft => {
        draft.color = color.hex;
      }),
    );
    MindmapActions.updateIdeaRequest({
      ...nodes[index],
      color: color.hex,
    });
  };

  handleMenuClick = (mode, type) => {
    const { pointer, mindmap, userId, repositoryId } = this.props;
    const {
      toggleContextMenu,
      toggleStyleMenu,
      toggleExplore,
      MindmapActions,
    } = this.props;

    const newNode = {
      project_id: repositoryId,
      user_id: userId,
      childOf: 0,
      isForked: 0,
      isEditing: true,
      color: '#ECF0F1',
      location: {
        x: pointer.prevLoc.x,
        y: pointer.prevLoc.y,
      },
      size: {
        width: 100,
        height: 40,
      },
      head: '',
      parentOf: [],
    };

    const explore = e => {
      toggleExplore();
      toggleContextMenu(e);
    };

    /* From canvas */

    const addFromCanvas = e => {
      MindmapActions.createIdeaRequest(newNode);
      toggleContextMenu(e);
    };

    /* From nodes */

    const addFromNode = e => {
      const { nodes } = this.props.mindmap;
      const { targetNodeId } = this.state;
      const targetNode =
        nodes[nodes.findIndex(node => node.id === targetNodeId)];

      //addNode({ ...newNode, childOf: targetNodeId });
      //addPath({ start: targetNode, end: newNode });
      toggleContextMenu(e);
    };

    const remove = e => {
      const { targetNodeId } = this.state;
      MindmapActions.removeIdeaRequest(targetNodeId);
      toggleContextMenu(e);
    };

    const editNode = e => {
      const { targetNodeId } = this.state;

      MindmapActions.toggleNodeEditing(targetNodeId);
      toggleContextMenu(e);
    };

    const changeColor = e => {
      const { targetNodeId } = this.state;
      const { nodes } = this.props;

      const index = nodes.findIndex(node => node.id === targetNodeId);

      this.setState(
        produce(draft => {
          draft.color = nodes[index].color;
          draft.isColorPicker = true;
        }),
      );
    };

    // menu types
    // * canvas
    //   - ADD_NODE_FROM_CANVAS: add new idea from canvas
    //   - SEARCH: explore ideas
    //
    // * node
    //   - REMOVE: add new idea
    //   - ATTACH_FILE: attach external file
    //   - ADD_NODE_FROM_NODE: add new idea from parent node
    //   - EDIT: edit text content in node
    //   - STYLE: choose node's style
    //   - SEARCH: explore the other side's idea
    if (mode === 'canvas')
      switch (type) {
        case 'ADD_NODE_FROM_CANVAS':
          return addFromCanvas;
        case 'SEARCH':
          return explore;
        default:
          return null;
      }
    else if (mode === 'node')
      switch (type) {
        case 'ADD_NODE_FROM_NODE':
          return addFromNode;
        case 'EDIT':
          return editNode;
        case 'REMOVE':
          return remove;
        case 'SEARCH_IDEAS':
          return explore;
        case 'STYLE':
          return changeColor;
        default:
          return null;
      }
    else return null;
  };

  render() {
    const { mode, pointer } = this.props;
    const { currentMenu, isColorPicker, color } = this.state;
    const {
      handleMenuClick,
      handleMouseOver,
      handleMouseOut,
      handleChangeComplete,
    } = this;
    const { list, options } = ContextMenuData[`${mode}`];
    const {
      wrapperSize,
      bgColor,
      iconSize,
      innerRadius,
      outerRadius,
      menuSpaceDegrees,
    } = ContextMenuData.options;

    const menuDegrees = 360 / list.length;

    return (
      <div>
        <MenuWrapper
          location={pointer.currLoc}
          wrapperSize={wrapperSize}
          bgColor={bgColor}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
        >
          {isColorPicker ? (
            <ChromePicker
              color={color}
              onChangeComplete={handleChangeComplete}
            />
          ) : (
            <SVG
              location={pointer.currLoc}
              wrapperSize={wrapperSize}
              bgColor={bgColor}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
            >
              <g>
                {list.map((item, i) => (
                  <MenuItem
                    key={i}
                    index={i}
                    menu={item}
                    options={options}
                    iconSize={iconSize}
                    wrapperSize={wrapperSize}
                    menuDegrees={menuDegrees}
                    menuSpaceDegrees={menuSpaceDegrees}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    handleMenuClick={handleMenuClick(mode, item.type)}
                    handleMouseOver={handleMouseOver}
                    handleMouseOut={handleMouseOut}
                  />
                ))}
              </g>
            </SVG>
          )}
        </MenuWrapper>
        {isColorPicker ? null : (
          <MenuLabel
            wrapperSize={wrapperSize}
            location={pointer.currLoc}
            options={options}
            label={currentMenu}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  nodes: state.mindmap.nodes,
});

const mapDispatchToProps = dispatch => ({
  MindmapActions: bindActionCreators(mindmapActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContextMenuContainer);
