/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

class GroupContainer extends Component {
  state = {
    filter: 'all',
    searchTo: '',
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
    GroupActions.peopleRequest(groupId);
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
    } = this;
    const { groupId, loggedUserId, repositories, people } = this.props;
    const {
      filter,
      modify,
      searchTo,
      cropper,
      displayColorPicker,
    } = this.state;

    switch (menu) {
      case 'people':
        return <People list={people} />;
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
    const {
      url,
      menu,
      authState,
      groupState,
      repositoriesState,
      groupId,
      info,
      people,
    } = this.props;
    if (
      authState === 'success' &&
      groupState.people === 'success' &&
      groupState.info === 'success' &&
      repositoriesState === 'success'
    )
      return (
        <>
          <Header url={url} menu={menu} groupId={groupId} info={info} />
          <GroupWrapper>{renderMenu(menu)}</GroupWrapper>
        </>
      );
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupContainer);
