/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-multi-assign */
/* eslint-disable no-cond-assign */
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
    if (this.props.mode === 'Edit') {
      document.querySelector('.editable').focus();
    }
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
    if (this.props.mode === 'Edit') {
      document.querySelector('.editable').focus();
    }
  }

  handleTextContent = e => {
    // wrapper-width (356px)
    // default size: w100px, h40px

    // offset-width (116px) (default case: font-size 16px)
    // - padding 0.5em * 2 = 16px;
    // - min-width = 100px
    this.setState(
      produce(this.state, draft => {
        const strByteLength = (s, b, i, c) => {
          for (
            b = i = 0;
            (c = s.charCodeAt(i++));
            b += c >> 11 ? 3 : c >> 7 ? 2 : 1
          );
          return b;
        };

        draft.node.head = e.target.value;
        if (strByteLength(e.target.value) / 40 < 1) {
          draft.node.size.width = strByteLength(e.target.value) * 8 + 30;
        } else {
          draft.node.size.height =
            ((40 + strByteLength(e.target.value)) / 40) * 30;
        }
      }),
    );
  };

  handleResize = e => {
    e.persist();
    this.setState(
      produce(draft => {
        draft.node.size.width = e.target.clientWidth;
        draft.node.size.height = e.target.clientHeight;
      }),
    );
  };

  handleBlur = e => {
    const { MindmapActions } = this.props;
    const { node } = this.state;

    MindmapActions.updateIdeaRequest({ ...node, isEditing: false });
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
    const {
      handleResize,
      handleBlur,
      handleTextContent,
      handleKeyPress,
    } = this;
    const hasFeedback = node.feedbacks && node.feedbacks.length > 0;

    if (mode === 'SVG')
      return (
        <Node
          index={node.id}
          head={node.head}
          location={node.location}
          size={node.size}
          color={node.color}
          pointer={pointer}
          isForked={node.isForked}
          hasFile={node.hasFfile}
          hasFeedback={hasFeedback}
        />
      );
    else if (mode === 'Edit')
      return (
        <NodeEditor
          index={node.id}
          head={node.head}
          location={node.location}
          size={node.size}
          color={node.color}
          handleTextContent={handleTextContent}
          handleResize={handleResize}
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
