/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNodes, getPaths } from 'store/modules/mindmap';
import NodesData from 'data/Nodes';
import Path from 'components/mindmap/Path';
import Header from 'components/mindmap/Header';
import Aside from 'components/mindmap/Aside';
import Footer from 'components/mindmap/Footer';
import CanvasContainer from './MindmapEditor/CanvasContainer';
import ContextMenuContainer from './MindmapEditor/ContextMenuContainer';
import NodeContainer from './MindmapEditor/NodeContainer';

class App extends Component {
  componentDidMount() {
    const { getNodes, getPaths } = this.props;
    getNodes(NodesData);
    getPaths(NodesData);
  }

  preventEvent = () => {
    window.event.returnValue = false;
  };

  render() {
    const { preventEvent } = this;
    const { mindmap, canvas } = this.props;
    return (
      <div
        className="App"
        onContextMenu={preventEvent}
        style={{ overflow: 'hidden', maxHeight: '100vh' }}
      >
        <Header />
        <CanvasContainer>
          <g id="mindmap">
            <g id="paths">
              {mindmap.paths.map(
                (path, i) =>
                  path.startAt && (
                    <Path
                      key={i}
                      mode={path.options.mode}
                      space={18}
                      color={path.options.color}
                      endPosition={path.options.endPosition}
                      startAt={path.startAt}
                      endAt={path.endAt}
                    />
                  ),
              )}
            </g>
            <g id="nodes">
              {mindmap.nodes.map((item, i) =>
                item.isEditing ? (
                  <NodeContainer key={i} item={item} mode="Edit" />
                ) : (
                  <NodeContainer key={i} item={item} mode="SVG" />
                ),
              )}
            </g>
          </g>
        </CanvasContainer>
        {canvas.contextMenu.mode && (
          <ContextMenuContainer mode={canvas.contextMenu.mode} />
        )}
        <Aside />

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pointer: state.pointer,
  mindmap: state.mindmap,
  canvas: state.canvas,
  node: state.node,
});

const mapDispatchToProps = dispatch => ({
  getNodes: data => dispatch(getNodes(data)),
  getPaths: path => dispatch(getPaths(path)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
