/* eslint-disable react/no-unused-state */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import html2canvas from 'html2canvas';
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
      target: { class: null, nodeId: null },
      state: {
        isDown: false,
        isDrag: false,
      },
      currLoc: { x: 0, y: 0 },
      prevLoc: { x: 0, y: 0 },
    },
    canvas: {
      svg: null,
      viewBox: 0,
    },
    contextMenu: null,
    explore: false,
  };

  componentDidMount() {
    const { setSVG, createSVGPoint, setViewBoxBaseVal } = this;
    const { getNodes, getPaths } = this.props;
    getNodes(NodesData);
    getPaths(NodesData);

    const svg = document.querySelector('#canvas');
    setSVG(svg);
    createSVGPoint(svg);
    setViewBoxBaseVal(svg);
  }

  /* Canvas initial Actions */
  preventEvent = () => {
    window.event.returnValue = false;
  };

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

  setViewBoxBaseVal = svg => {
    this.setState(
      produce(draft => {
        draft.canvas.viewBox = svg.viewBox.baseVal;
      }),
    );
  };

  /* Pointer Actions */
  setViewBoxLocation = distance => {
    this.setState(
      produce(draft => {
        draft.canvas.viewBox.x -= distance.x;
        draft.canvas.viewBox.y -= distance.y;
      }),
    );
  };

  getLocationFromEvent = event => {
    const { pointer } = this.state;
    const point = pointer.currLoc;

    point.x = event.targetTouches
      ? event.targetTouches[0].clientX
      : event.clientX;
    point.y = event.targetTouches
      ? event.targetTouches[0].clientY
      : event.clientY;

    this.setState(
      produce(draft => {
        draft.pointer.currLoc = point;
      }),
    );

    return point;
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
    event.persist();
    this.setState(
      produce(draft => {
        draft.pointer.state.isDown = true;
        draft.explore = false;
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

  /* Toggle Actions */
  toggleContextMenu = event => {
    event.persist();
    this.setState(
      produce(draft => {
        if (event.button === 0) draft.contextMenu = null;
        else if (event.button === 2)
          draft.contextMenu =
            event.target.className.baseVal && event.target.className.baseVal;
      }),
    );
  };

  toggleExplore = () => {
    this.setState(
      produce(draft => {
        draft.explore = true;
      }),
    );
  };

  /* Export Mindmap PNG Image   */
  exportMindmap = targetDOM => {
    const svg = document.querySelector(targetDOM);
    svg.viewBox.baseVal.x = -4000;
    svg.viewBox.baseVal.y = -2000;
    const wrapper = document.querySelector('#canvasFrame');

    html2canvas(wrapper).then(canvas => {
      const imgURI = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');

      const evt = new MouseEvent('click', {
        view: window,
        bubbles: false,
        cancelable: true,
      });

      const a = document.createElement('a');
      a.setAttribute('download', 'MY_COOL_IMAGE.png');
      a.setAttribute('href', imgURI);
      a.setAttribute('target', '_blank');

      a.dispatchEvent(evt);
    });
  };

  render() {
    const {
      preventEvent,
      setSVG,
      createSVGPoint,
      setViewBoxLocation,
      getLocationFromEvent,
      setPrevLoc,
      pointerUp,
      pointerDown,
      pointerMove,
      toggleContextMenu,
      toggleExplore,
      exportMindmap,
    } = this;
    const { mindmap } = this.props;
    const { pointer, contextMenu, explore } = this.state;
    return (
      <div
        className="App"
        onContextMenu={preventEvent}
        style={{ overflow: 'hidden', maxHeight: '100vh' }}
      >
        <Header exportMindmap={exportMindmap} />
        <CanvasContainer
          pointer={pointer}
          setSVG={setSVG}
          createSVGPoint={createSVGPoint}
          setViewBoxLocation={setViewBoxLocation}
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
                      index={i}
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
        {contextMenu && (
          <ContextMenuContainer
            pointer={pointer}
            mode={contextMenu}
            toggleContextMenu={toggleContextMenu}
            toggleExplore={toggleExplore}
          />
        )}
        {explore && <Aside explore={explore} />}

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mindmap: state.mindmap,
});

const mapDispatchToProps = dispatch => ({
  getNodes: data => dispatch(getNodes(data)),
  getPaths: path => dispatch(getPaths(path)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
