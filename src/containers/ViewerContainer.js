/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as repositoryActions from 'store/modules/repository';
import * as mindmapActions from 'store/modules/mindmap';
import html2canvas from 'html2canvas';
import axios from 'axios';
import produce from 'immer';
import ProgressIndicator from 'components/base/ProgressIndicator';
import Path from 'components/mindmap/Path';
import Header from 'components/mindmap/Header';
import Footer from 'components/mindmap/Footer';
import CanvasContainer from './Viewer/CanvasContainer';
import AsideContainer from './Viewer/AsideContainer';
import CommentContainer from './Viewer/CommentContainer';
import ContextMenuContainer from './Viewer/ContextMenuContainer';
import NodeContainer from './Viewer/NodeContainer';

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
      file: {
        state: 'pending',
        isActivated: false,
        targetNode: null,
        list: [],
      },
      comment: {
        isActivated: false,
        targetNode: null,
      },
    };
  }

  componentDidMount() {
    const { setSVG, createSVGPoint, setViewBoxBaseVal } = this;
    const { repositoryId, RepositoryActions, MindmapActions } = this.props;
    RepositoryActions.getRequest(repositoryId).then(() => {
      const { author, repository } = this.props;
      const { user_id, group_id, project_topic } = repository;
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
        draft.file.isActivated = false;
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

  goBack = () => {
    const { history } = this.props;

    history.push('');
  };

  /* Toggle Menu   */

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

  toggleComment = nodeId => {
    const { nodes, repositoryId } = this.props;
    const { comment } = this.state;
    if (!comment.isActivated)
      this.setState(
        produce(draft => {
          const index = nodes.findIndex(node => node.id === nodeId);
          draft.comment = {
            isActivated: true,
            targetNode: nodes[index],
          };
        }),
      );
    else
      this.setState(
        produce(draft => {
          draft.comment = {
            isActivated: false,
            targetNode: null,
          };
        }),
      );

    // axios
    //   .post('/api/idea/file/select/', {
    //     idea_id: nodes[index].id,
    //   })
    //   .then(({ data }) => {
    //     this.setState(
    //       produce(draft => {
    //         draft.file.state = 'success';
    //         draft.file.list = data;
    //       }),
    //     );
    //   })
    //   .catch(() => {
    //     this.setState(
    //       produce(draft => {
    //         draft.file.state = 'failure';
    //       }),
    //     );
    //   });
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

  /* === Actions end === */

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
      toggleFile,
      toggleComment,
      exportMindmap,
      handleCanvasZoom,
      handleMouseWheel,
      goBack,
    } = this;
    const {
      authState,
      repoState,
      mindmapState,
      loggedUserId,
      paths,
      nodes,
      repositoryId,
    } = this.props;
    const {
      type,
      repositoryInfo,
      pointer,
      explore,
      canvas,
      contextMenu,
      file,
      comment,
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
          type={type}
          info={repositoryInfo}
          onClick={goBack}
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
            toggleFile={toggleFile}
            toggleComment={toggleComment}
          />
        )}
        {file.isActivated && <AsideContainer file={file} />}
        {comment.isActivated && (
          <CommentContainer
            target={comment.targetNode}
            toggleComment={toggleComment}
          />
        )}
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
  authState: state.auth.state,
  repoState: state.repository.state,
  loggedUserId: state.auth.userInfo.user_id,
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
