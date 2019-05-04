/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as repositoryActions from 'store/modules/repository';
import * as mindmapActions from 'store/modules/mindmap';
import html2canvas from 'html2canvas';
import produce from 'immer';
import axios from 'axios';
import ProgressIndicator from 'components/base/ProgressIndicator';
import Path from 'components/mindmap/Path';
import Header from 'components/mindmap/Header';
import Footer from 'components/mindmap/Footer';
import AsideContainer from './Mindmap/AsideContainer';
import CanvasContainer from './Mindmap/CanvasContainer';
import ContextMenuContainer from './Mindmap/ContextMenuContainer';
import NodeContainer from './Mindmap/NodeContainer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repositoryInfo: {
        user_id: 0,
        group_id: 0,
        project_topic: '',
      },
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
        zoom: 1,
      },
      contextMenu: {
        mode: null,
        location: {
          x: 0,
          y: 0,
        },
      },
      info: {
        state: 'pending',
        isActivated: false,
        data: {},
      },
      explore: {
        state: 'pending',
        isActivated: false,
        targetNode: null,
        results: [],
        ideas: [],
      },
    };
  }

  componentDidMount() {
    const { setSVG, createSVGPoint, setViewBoxBaseVal } = this;
    const { repositoryId, RepositoryActions, MindmapActions } = this.props;
    RepositoryActions.getRequest(repositoryId).then(() => {
      const { user_id, group_id, project_topic } = this.props.repository;
      this.setState(
        produce(draft => {
          draft.repositoryInfo = {
            user_id,
            group_id,
            project_topic,
          };
        }),
      );
    });
    MindmapActions.loadIdeasRequest(repositoryId);
    const svg = document.querySelector('#canvas');
    setSVG(svg);
    createSVGPoint(svg);
    setViewBoxBaseVal(svg);
  }

  componentWillUnmount() {
    const { RepositoryActions, MindmapActions } = this.props;
    RepositoryActions.initialize();
    MindmapActions.initialize();
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

  handleCanvasZoom = e => {
    e.persist();
    this.setState(
      produce(draft => {
        draft.canvas.zoom = e.target.value;
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
        draft.explore.isActivated = false;
        draft.info.isActivated = false;
        draft.pointer.target.class =
          event.target.className.baseVal && event.target.className.baseVal;
        draft.pointer.target.nodeId =
          (event.target.className.baseVal === 'node' ||
            event.target.className.baseVal === 'forked') &&
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

  handleMouseWheel = e => {
    e.persist();

    this.setState(
      produce(draft => {
        const { canvas } = this.state;
        if (e.deltaY < 0 && canvas.zoom < 2.0) draft.canvas.zoom += 0.1;
        else if (e.deltaY > 0 && canvas.zoom > 0.5) draft.canvas.zoom -= 0.1;
      }),
    );
  };

  /* Toggle Actions */
  toggleContextMenu = event => {
    event.persist();
    const { pointer } = this.state;
    console.log(event.target.id);
    this.setState(
      produce(draft => {
        if (event.button === 0) draft.contextMenu.mode = null;
        else if (event.button === 2) {
          if (event.target.id === '0') draft.contextMenu.mode = 'root';
          else
            draft.contextMenu.mode =
              event.target.className.baseVal && event.target.className.baseVal;
          draft.contextMenu.location = pointer.currLoc;
          draft.pointer.state.isDown = false;
          draft.pointer.state.isDrag = false;
        }
      }),
    );
  };

  toggleInfo = forkedId => {
    this.setState(
      produce(draft => {
        draft.info = {
          state: 'pending',
          isActivated: true,
          data: {},
        };
      }),
    );
    axios
      .post('/api/idea/info/', { is_forked: forkedId })
      .then(({ data }) => {
        this.setState(
          produce(draft => {
            draft.info = {
              state: 'success',
              isActivated: true,
              data,
            };
          }),
        );
      })
      .catch(() => {
        this.setState(
          produce(draft => {
            draft.explore.state = 'failure';
          }),
        );
      });
  };

  toggleExplore = (id = 0) => {
    const nodeId = id || 0;
    const { nodes, repositoryId } = this.props;
    const index = nodes.findIndex(node => node.id === nodeId);

    this.setState(
      produce(draft => {
        draft.explore = {
          state: 'pending',
          isActivated: true,
          targetNode: nodes[index],
          results: [],
        };
      }),
    );

    axios
      .post('/api/idea/search/', {
        idea_cont: nodes[index].head,
        project_id: repositoryId,
      })
      .then(({ data }) => {
        const ideas = [];
        this.setState(
          produce(draft => {
            draft.explore.state = 'success';
            draft.explore.results = data;
            data.forEach(section => {
              section.Idea.forEach(idea => {
                ideas.push(idea);
              });
            });
            draft.explore.ideas = ideas;
          }),
        );
      })
      .catch(() => {
        this.setState(
          produce(draft => {
            draft.explore.state = 'failure';
          }),
        );
      });
  };

  /* Export Mindmap PNG Image   */
  exportMindmap = targetDOM => {
    const { cavasPins } = this.props;
    const svg = document.querySelector(targetDOM);
    const wrapper = document.querySelector('#canvasFrame');

    svg.viewBox.baseVal.x = cavasPins.leftTop.x - 100;
    svg.viewBox.baseVal.y = cavasPins.leftTop.y - 100;

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
      toggleInfo,
      toggleExplore,
      exportMindmap,
      handleCanvasZoom,
      handleMouseWheel,
    } = this;
    const { repoState, mindmapState, paths, nodes, repositoryId } = this.props;
    const {
      type,
      repositoryInfo,
      pointer,
      contextMenu,
      info,
      explore,
      canvas,
    } = this.state;
    const { user_id } = JSON.parse(localStorage.getItem('userInfo'));

    return (
      <div
        className="App"
        onContextMenu={preventEvent}
        style={{ overflow: 'hidden', maxHeight: '100vh' }}
      >
        {repoState.read !== 'success' || mindmapState.read !== 'success' ? (
          <ProgressIndicator />
        ) : null}
        <Header
          exportMindmap={exportMindmap}
          type={type}
          info={repositoryInfo}
        />
        <CanvasContainer
          userId={user_id}
          repositoryId={repositoryId}
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
          handleMouseWheel={handleMouseWheel}
          explore={explore}
          zoom={canvas.zoom}
        >
          <g id="mindmap">
            <g id="paths">
              {paths.map(
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
              {nodes.map((item, i) =>
                item.isEditing ? (
                  <NodeContainer
                    repositoryId={repositoryId}
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
        {contextMenu.mode && (
          <ContextMenuContainer
            pointer={pointer}
            mode={contextMenu.mode}
            location={contextMenu.location}
            userId={user_id}
            repositoryId={repositoryId}
            toggleContextMenu={toggleContextMenu}
            toggleInfo={toggleInfo}
            toggleExplore={toggleExplore}
          />
        )}
        {explore.isActivated && <AsideContainer explore={explore} />}
        {info.isActivated && <AsideContainer info={info} />}
        <Footer
          type={type}
          zoom={canvas.zoom}
          handleCanvasZoom={handleCanvasZoom}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  repoState: state.repository.state,
  mindmapState: state.mindmap.state,
  repository: state.repository.info,
  cavasPins: state.mindmap.cavasPins,
  paths: state.mindmap.paths,
  nodes: state.mindmap.nodes,
});

const mapDispatchToProps = dispatch => ({
  RepositoryActions: bindActionCreators(repositoryActions, dispatch),
  MindmapActions: bindActionCreators(mindmapActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
