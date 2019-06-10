/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import produce from 'immer';
import ProgressIndicator from 'components/base/ProgressIndicator';
import Header from 'components/group/Header';
import GroupWrapper from 'components/group/GroupWrapper';
import Repositories from 'components/group/Repositories';
import People from 'components/group/People';
import Setting from 'components/group/Setting';
import getCroppedImg from 'tools/CropImage';
import * as userActions from 'store/modules/user';
import * as groupActions from 'store/modules/group';
import * as alertActions from 'store/modules/alert';

class GroupContainer extends Component {
  state = {
    filter: 'all',
    searchTo: '',
    isInviting: false,
    userList: null,
    master: {
      user_id: 0,
    },
    displayColorPicker: false,
    cropper: {
      imgSrc: '',
      crop: { x: 0, y: 0 },
      zoom: 1,
      aspect: 1,
      croppedAreaPixels: null,
    },
    modify: {
      bgColor: '',
      imgSrc: '',
    },
  };

  componentDidMount() {
    const { groupId, UserActions, GroupActions } = this.props;

    UserActions.repositoriesRequest(0, groupId);
    GroupActions.peopleRequest(groupId).then(() => {
      const { people } = this.props;

      this.setState(
        produce(draft => {
          draft.master = people[0];
        }),
      );
    });
    GroupActions.infoRequest(groupId);
  }

  handleFilter = e => {
    e.persist();
    e.stopPropagation();

    this.setState(
      produce(draft => {
        draft.filter = e.target.value;
      }),
    );
  };

  handleSearchTo = e => {
    e.persist();

    this.setState(
      produce(draft => {
        draft.searchTo = e.target.value;
      }),
    );
  };

  handleInvite = () => {
    this.setState(
      produce(this.state, draft => {
        draft.isInviting = !this.state.isInviting;
        draft.searchTo = '';
        draft.userList = null;
      }),
    );
  };

  findUser = () => {
    const { searchTo } = this.state;

    axios
      .post('/api/user/find/', {
        user_email: searchTo,
      })
      .then(res => {
        this.setState(
          produce(draft => {
            draft.userList = res.data;
          }),
        );
      });
  };

  sendInvite = () => {
    const { handleInvite } = this;
    const { loggedUserId, AlertActions } = this.props;
    const { userList } = this.state;

    AlertActions.sendRequest({
      send_id: loggedUserId,
      receive_id: userList.user_id,
      request_cont: 'requests',
    });

    handleInvite();
  };

  /* IMAGE CROPPER ACTIONS */

  onCropChange = crop => {
    this.setState(
      produce(draft => {
        draft.cropper.crop = crop;
      }),
    );
  };

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    this.setState(
      produce(draft => {
        draft.cropper.croppedAreaPixels = croppedAreaPixels;
      }),
    );
  };

  onZoomChange = zoom => {
    this.setState(
      produce(draft => {
        draft.cropper.zoom = zoom;
      }),
    );
  };

  showCroppedImage = async () => {
    const { imgSrc, croppedAreaPixels } = this.state.cropper;
    const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
    this.setState(
      produce(draft => {
        draft.modify.imgSrc = croppedImage;
      }),
    );
    console.log(croppedImage);
    // axios.post('/api/user_img/update/', {})
  };

  /* COLOR PICKER ACTIONS */

  handleClick = () => {
    const { displayColorPicker } = this.state;

    this.setState(
      produce(this.state, draft => {
        draft.displayColorPicker = !displayColorPicker;
      }),
    );
  };

  handleClose = () => {
    this.setState(
      produce(draft => {
        draft.displayColorPicker = false;
      }),
    );
  };

  handleChange = e => {
    if (!e.target) {
      this.setState(
        produce(draft => {
          draft.modify.bgColor = e.hex;
        }),
      );
    } else if (e.target.name === 'imgSrc') {
      const reader = new FileReader();
      reader.onload = () => {
        this.setState(
          produce(draft => {
            draft.cropper.imgSrc = reader.result;
          }),
        );
      };
      reader.readAsDataURL(e.target.files[0]);
    } else if (e.target.name === 'range') {
      e.persist();
      this.setState(
        produce(draft => {
          draft.cropper.zoom = e.target.value;
        }),
      );
    } else {
      e.persist();
      this.setState(draft => {
        draft.modify[e.target.name] = e.target.value;
      });
    }
  };

  renderMenu = menu => {
    const {
      handleFilter,
      handleSearchTo,
      onCropChange,
      onCropComplete,
      onZoomChange,
      showCroppedImage,
      handleChange,
      handleClick,
      handleClose,
      handleInvite,
      findUser,
      sendInvite,
    } = this;
    const { groupId, loggedUserId, repositories, people } = this.props;
    const {
      isInviting,
      userList,
      master,
      filter,
      modify,
      searchTo,
      cropper,
      displayColorPicker,
    } = this.state;
    const isMaster = master.user_id === loggedUserId;

    switch (menu) {
      case 'people':
        return (
          <People
            isInviting={isInviting}
            userList={userList}
            searchTo={searchTo}
            master={master}
            isMaster={isMaster}
            list={people}
            handleInvite={handleInvite}
            handleSearchTo={handleSearchTo}
            findUser={findUser}
            sendInvite={sendInvite}
          />
        );
      case 'settings':
        return (
          <Setting
            loggedUser={loggedUserId}
            cropper={cropper}
            modify={modify}
            displayColorPicker={displayColorPicker}
            onCropChange={onCropChange}
            onCropComplete={onCropComplete}
            onZoomChange={onZoomChange}
            showCroppedImage={showCroppedImage}
            handleChange={handleChange}
            handleClick={handleClick}
            handleClose={handleClose}
          />
        );
      default:
        return (
          <Repositories
            isMaster={isMaster}
            groupId={groupId}
            repositories={repositories}
            filter={filter}
            searchTo={searchTo}
            handleFilter={handleFilter}
            handleSearchTo={handleSearchTo}
          />
        );
    }
  };

  render() {
    const { renderMenu } = this;
    const { master } = this.state;
    const {
      url,
      menu,
      authState,
      groupState,
      repositoriesState,
      groupId,
      info,
      people,
      loggedUserId,
    } = this.props;
    if (
      authState === 'success' &&
      groupState.people === 'success' &&
      groupState.info === 'success' &&
      repositoriesState === 'success'
    ) {
      const isMaster = master.user_id === loggedUserId;

      return (
        <>
          <Header
            url={url}
            isMaster={isMaster}
            menu={menu}
            groupId={groupId}
            info={info}
          />
          <GroupWrapper>{renderMenu(menu)}</GroupWrapper>
        </>
      );
    }
    return <ProgressIndicator />;
  }
}

const mapStateToProps = state => ({
  authState: state.auth.state,
  repositoriesState: state.user.state.repositories,
  groupState: state.group.state,
  loggedUserId: state.auth.userInfo.user_id,
  repositories: state.user.repositories,
  info: state.group.info,
  people: state.group.people,
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(userActions, dispatch),
  GroupActions: bindActionCreators(groupActions, dispatch),
  AlertActions: bindActionCreators(alertActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupContainer);
