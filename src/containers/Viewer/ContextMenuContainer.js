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

  handleMouseOver = e => {
    this.setState({
      currentMenu: e.currentTarget.dataset.label,
    });
  };

  handleMouseOut = () => {
    this.setState(
      produce(draft => {
        draft.currentMenu = '';
      }),
    );
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

  handleMenuClick = type => {
    const { toggleContextMenu, toggleFile} = this.props;

    const viewFiles = e => {
      const { targetNodeId } = this.state;

      toggleFile(targetNodeId);
      toggleContextMenu(e);
    };

    const sendComment = e => {
      const { toggleComment } = this.props;
      const { targetNodeId } = this.state;

      toggleComment(targetNodeId);
      toggleContextMenu(e);
    };

    switch (type) {
      case 'FILE_LIST':
        return viewFiles;
      case 'COMMENT':
        return sendComment;
      default:
        return null;
    }
  };

  render() {
    const { location } = this.props;
    const { currentMenu, isColorPicker, color } = this.state;
    const {
      handleMenuClick,
      handleMouseOver,
      handleMouseOut,
      handleChangeComplete,
    } = this;
    const { list, options } = ContextMenuData.viewer;
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
          location={location}
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
              location={location}
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
                    handleMenuClick={handleMenuClick(item.type)}
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
            location={location}
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
