/* eslint-disable no-else-return */
/* eslint-disable no-shadow */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import produce from 'immer';
import { bindActionCreators } from 'redux';
import * as mindmapActions from 'store/modules/mindmap';
import Node from 'components/mindmap/Node/SVG';
import NodeEditor from 'components/mindmap/Node/Editor';

// node dataset
// {
//   "id": 0,
//   "isEditing": false,
//   "location": {
//     "x": -1358.8887939453125,
//     "y": -1407.77783203125
//   },
//   "size": {
//     "width": 100,
//     "height": 40
//   },
//   "color": "#a37fb4",
//   "head": "",
//   "parentOf": [1, 2],
//   "childOf": null
// }

class NodeContainer extends Component {
  constructor(props) {
    super(props);
    const { item } = this.props;
    this.ref = React.createRef();

    this.state = {
      node: {
        ...item,
      },
      temp: {
        ...item,
      },
    };
  }

  componentDidMount() {
    if (this.props.mode === 'Edit') this.ref.current.focus();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      node: {
        ...nextProps.item,
      },
      temp: {
        ...nextProps.item,
      },
    });
  }

  componentDidUpdate() {
    if (this.props.mode === 'Edit') this.ref.current.focus();
  }

  handleTextContent = e => {
    e.persist();
    // wrapper-width (356px)
    // default size: w100px, h40px

    // offset-width (116px) (default case: font-size 16px)
    // - padding 0.5em * 2 = 16px;
    // - min-width = 100px

    this.setState(
      produce(this.state, draft => {
        const { size } = this.state.node;
        const gab = {
          width: e.target.clientWidth - size.width,
          height: e.target.clientHeight - size.height,
        };

        draft.node.head = e.target.textContent;
        draft.node.location.x -= gab.width > 0 && gab.width / 2;
        draft.node.location.y -= gab.height > 0 && gab.height / 2;
        draft.node.size.width += gab.width > 0 && gab.width * 4;
        draft.node.size.height += gab.height > 0 && gab.height * 2;
      }),
    );
  };

  handleBlur = e => {
    const { MindmapActions } = this.props;
    const { node } = this.state;
    MindmapActions.updateIdeaRequest({
      ...node,
      head: e.target.textContent,
      isEditing: false,
      location: {
        x: node.location.x - e.target.clientWidth / 2 - 60,
        y: node.location.y - e.target.clientHeight / 2 - 40,
      },
      size: { width: e.target.clientWidth + 10, height: e.target.clientHeight },
    });
  };

  handleKeyPress = e => {
    const { MindmapActions } = this.props;
    const { node, temp } = this.state;
    if (e.key === 'Enter') {
      MindmapActions.updateIdeaRequest({ ...node, isEditing: false });
    } else if (e.key === 'Escape') {
      MindmapActions.updateIdeaRequest({ ...temp, isEditing: false });
    }
  };

  render() {
    const { node } = this.state;
    const { mode, pointer } = this.props;
    const { ref, handleBlur, handleTextContent, handleKeyPress } = this;
    if (mode === 'SVG')
      return (
        <Node
          index={node.id}
          head={node.head}
          location={node.location}
          size={node.size}
          color={node.color}
          pointer={pointer}
        />
      );
    else if (mode === 'Edit')
      return (
        <NodeEditor
          ref={ref}
          index={node.id}
          head={node.head}
          location={node.location}
          size={node.size}
          color={node.color}
          pointer={pointer}
          handleTextContent={handleTextContent}
          handleBlur={handleBlur}
          handleKeyPress={handleKeyPress}
        />
      );
    else return null;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  MindmapActions: bindActionCreators(mindmapActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NodeContainer);
