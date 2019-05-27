/* eslint-disable react/no-access-state-in-setstate */
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
import AsideContainer from './Editor/AsideContainer';
import FooterContainer from './Editor/FooterContainer';
import CanvasContainer from './Editor/CanvasContainer';
import ContextMenuContainer from './Editor/ContextMenuContainer';
import NodeContainer from './Editor/NodeContainer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repositoryInfo: {
        author: '',
        user_id: 0,
        group_id: 0,
        project_topic: '',
        type: 'user',
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
      file: {
        state: 'pending',
        isActivated: false,
        targetNode: null,
        list: [],
      },
      chat: {
        isActivated: false,
      },
    };
  }

  componentDidMount() {
    const { setSVG, createSVGPoint, setViewBoxBaseVal } = this;
    const {
      history,
      loggedUserId,
      repositoryId,
      RepositoryActions,
      MindmapActions,
    } = this.props;
    if (!loggedUserId) {
      history.back();
    } else {
      RepositoryActions.getRequest(repositoryId).then(() => {
        const { author, repository } = this.props;
        const { user_id, group_id, project_topic } = repository;
        if (user_id !== loggedUserId) {
          history.replace('viewer');
        }
        this.setState(
          produce(draft => {
            draft.repositoryInfo = {
              author,
              user_id,
              group_id,
              project_topic,
              type: user_id > 0 ? 'user' : 'group',
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
  }

  componentWillUnmount() {
    const { RepositoryActions, MindmapActions } = this.props;
    RepositoryActions.initialize();
    MindmapActions.initialize();
  }

  /* === Actions start === */
  /* initial action */

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
        draft.file.isActivated = false;
        draft.info.isActivated = false;
        draft.chat.isActivated = false;
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

  toggleFile = nodeId => {
    const { nodes, repositoryId } = this.props;
    const index = nodes.findIndex(node => node.id === nodeId);
    this.setState(
      produce(draft => {
        draft.file = {
          state: 'pending',
          isActivated: true,
          targetNode: nodes[index],
          list: [],
        };
      }),
    );

    axios
      .post('/api/idea/file/select/', {
        idea_id: nodes[index].id,
      })
      .then(({ data }) => {
        this.setState(
          produce(draft => {
            draft.file.state = 'success';
            draft.file.list = data;
          }),
        );
      })
      .catch(() => {
        this.setState(
          produce(draft => {
            draft.file.state = 'failure';
          }),
        );
      });
  };

  uploadFile = e => {
    e.persist();
    const { file } = this.state;
    const data = new FormData();
    this.setState(
      produce(draft => {
        draft.file.state = 'pending';
      }),
    );
    data.append('idea_id', file.targetNode.id);
    data.append('file', e.target.files[0]);
    axios
      .post('/api/idea/file/upload/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        const { repositoryId, MindmapActions } = this.props;
        MindmapActions.loadIdeasRequest(repositoryId);
        this.setState(
          produce(draft => {
            draft.file.isActivated = false;
          }),
        );
      })
      .catch(err => {});
  };

  toggleChat = () => {
    this.setState(
      produce(draft => {
        draft.chat.isActivated = !this.state.chat.isActivated;
      }),
    );
  };

  /* Export Mindmap PNG Image   */
  exportMindmap = () => {
    const { canvasPins } = this.props;
    const svg = document.querySelector('#canvas');
    const wrapper = document.querySelector('#canvasFrame');

    svg.viewBox.baseVal.x = canvasPins.leftTop.x;
    svg.viewBox.baseVal.y = canvasPins.leftTop.y;
    svg.viewBox.width = canvasPins.rightBottom.x - canvasPins.leftTop.x;
    svg.viewBox.height = canvasPins.rightBottom.y - canvasPins.leftTop.y;

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
      a.setAttribute('download', '마인드맵.png');
      a.setAttribute('href', imgURI);
      a.setAttribute('target', '_blank');

      a.dispatchEvent(evt);
    });
  };

  uploadMindmap = () => {
    const { canvasPins, repositoryId, history } = this.props;
    const svg = document.querySelector('#canvas');
    const wrapper = document.querySelector('#canvasFrame');

    svg.viewBox.baseVal.x = canvasPins.leftTop.x;
    svg.viewBox.baseVal.y = canvasPins.leftTop.y;
    svg.viewBox.width = canvasPins.rightBottom.x - canvasPins.leftTop.x;
    svg.viewBox.height = canvasPins.rightBottom.y - canvasPins.leftTop.y;

    const data = new FormData();

    html2canvas(wrapper).then(canvas => {
      canvas.toBlob(blob => {
        data.append('image-file', blob, `project_${repositoryId}.png`);
        data.append('project_id', repositoryId);
        axios
          .post('/api/project/img/update/', data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(() => {
            history.push('/');
          });
      }, 'image/png');
    });
  };

  /* === Actions end === */

  render() {
    // functions
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
      toggleFile,
      uploadFile,
      toggleChat,
      exportMindmap,
      uploadMindmap,
      handleCanvasZoom,
      handleMouseWheel,
    } = this;
    // props
    const {
      history,
      authState,
      repoState,
      mindmapState,
      loggedUserId,
      paths,
      nodes,
      repositoryId,
    } = this.props;
    // states
    const {
      repositoryInfo,
      pointer,
      contextMenu,
      info,
      explore,
      file,
      chat,
      canvas,
    } = this.state;

    return (
      <div
        className="App"
        onContextMenu={preventEvent}
        style={{ overflow: 'hidden', maxHeight: '100vh' }}
      >
        {authState !== 'success' ||
        repoState.read !== 'success' ||
        mindmapState.read !== 'success' ? (
          <ProgressIndicator />
        ) : null}
        <Header
          exportMindmap={exportMindmap}
          type={repositoryInfo.type}
          info={repositoryInfo}
          onClick={uploadMindmap}
        />
        <CanvasContainer
          userId={loggedUserId}
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
            userId={loggedUserId}
            repositoryId={repositoryId}
            toggleContextMenu={toggleContextMenu}
            toggleInfo={toggleInfo}
            toggleExplore={toggleExplore}
            toggleFile={toggleFile}
          />
        )}
        {file.isActivated && (
          <AsideContainer file={file} uploadFile={uploadFile} />
        )}
        {explore.isActivated && <AsideContainer explore={explore} />}
        {info.isActivated && <AsideContainer info={info} />}
        {/* type; user, group */}
        {repositoryInfo.type === 'user' ? (
          <Footer
            type={repositoryInfo.type}
            zoom={canvas.zoom}
            handleCanvasZoom={handleCanvasZoom}
          />
        ) : (
          <FooterContainer
            groupId={repositoryInfo.group_id}
            repositoryId={repositoryId}
            type={repositoryInfo.type}
            zoom={canvas.zoom}
            chat={chat.isActivated}
            handleCanvasZoom={handleCanvasZoom}
            toggleChat={toggleChat}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authState: state.auth.state,
  repoState: state.repository.state,
  loggedUserId: state.auth.userInfo.user_id,
  mindmapState: state.mindmap.state,
  repository: state.repository.info,
  author: state.repository.author,
  canvasPins: state.mindmap.canvasPins,
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
