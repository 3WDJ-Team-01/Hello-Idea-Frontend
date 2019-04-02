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
import produce from 'immer';
import CanvasContainer from './Mindmap/CanvasContainer';
import ContextMenuContainer from './Mindmap/ContextMenuContainer';
import NodeContainer from './Mindmap/NodeContainer';

class App extends Component {
  state = {
    pointer: {
      svg: null,
      target: { class: null, nodeId: null },
      state: {
        isDown: false,
        isDrag: false,
      },
      currLoc: { x: 0, y: 0 },
      prevLoc: { x: 0, y: 0 },
    },
    contextMenu: null,
  };

  componentDidMount() {
    const { setSVG, createSVGPoint } = this;
    const { getNodes, getPaths } = this.props;
    getNodes(NodesData);
    getPaths(NodesData);

    const svg = document.querySelector('#canvas');
    setSVG(svg);
    createSVGPoint(svg);
  }

  preventEvent = () => {
    window.event.returnValue = false;
  };

  // pointer actions
  setSVG = svg => {
    this.setState(
      produce(draft => {
        draft.pointer.svg = svg;
      }),
    );
  };

  createSVGPoint = svg => {
    this.setState(
      produce(draft => {
        draft.pointer.currLoc = svg.createSVGPoint();
      }),
    );
  };

  getLocationFromEvent = event => {
    this.setState(
      produce(draft => {
        if (event.targetTouches) {
          draft.pointer.currLoc.x = event.targetTouches[0].clientX;
          draft.pointer.currLoc.y = event.targetTouches[0].clientY;
        } else {
          draft.pointer.currLoc.x = event.clientX;
          draft.pointer.currLoc.y = event.clientY;
        }
      }),
    );
  };

  setPrevLoc = location => {
    this.setState(
      produce(draft => {
        draft.pointer.prevLoc = location;
      }),
    );
  };

  pointerUp = () => {
    this.setState(
      produce(draft => {
        draft.pointer.state.isDown = false;
        draft.pointer.state.isDrag = false;
      }),
    );
  };

  pointerDown = event => {
    this.setState(
      produce(draft => {
        draft.pointer.state.isDown = true;
        draft.pointer.target.class =
          event.target.className.baseVal && event.target.className.baseVal;
        draft.pointer.target.nodeId =
          event.target.className.baseVal === 'node' &&
          parseInt(event.target.id, 10);
      }),
    );
  };

  pointerMove = () => {
    const { pointer } = this.state;
    this.setState(
      produce(draft => {
        draft.pointer.state.isDrag = pointer.state.isDown && true;
      }),
    );
  };

  // context menu
  toggleContextMenu = event => {
    this.setState(
      produce(draft => {
        if (event.button === 0) draft.contextMenu = null;
        else if (event.button === 2)
          draft.contextMenu =
            event.target.className.baseVal && event.target.className.baseVal;
      }),
    );
  };

  render() {
    const {
      preventEvent,
      setSVG,
      createSVGPoint,
      getLocationFromEvent,
      setPrevLoc,
      pointerUp,
      pointerDown,
      pointerMove,
      toggleContextMenu,
    } = this;
    const { mindmap, canvas } = this.props;
    const { pointer } = this.state;
    return (
      <div
        className="App"
        onContextMenu={preventEvent}
        style={{ overflow: 'hidden', maxHeight: '100vh' }}
      >
        <Header />
        <CanvasContainer
          pointer={pointer}
          setSVG={setSVG}
          createSVGPoint={createSVGPoint}
          getLocationFromEvent={getLocationFromEvent}
          setPrevLoc={setPrevLoc}
          pointerUp={pointerUp}
          pointerDown={pointerDown}
          pointerMove={pointerMove}
          toggleContextMenu={toggleContextMenu}
        >
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
                  <NodeContainer
                    key={i}
                    pointer={pointer}
                    item={item}
                    mode="Edit"
                  />
                ) : (
                  <NodeContainer
                    key={i}
                    pointer={pointer}
                    item={item}
                    mode="SVG"
                  />
                ),
              )}
            </g>
          </g>
        </CanvasContainer>
        {canvas.contextMenu.mode && (
          <ContextMenuContainer
            pointer={pointer}
            mode={canvas.contextMenu.mode}
          />
        )}
        {/* <Aside /> */}

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
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
