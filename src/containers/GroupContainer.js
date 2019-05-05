/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import produce from 'immer';
import ProgressIndicator from 'components/base/ProgressIndicator';
import Header from 'components/group/Header';
import GroupWrapper from 'components/group/GroupWrapper';
import Repositories from 'components/group/Repositories';
import People from 'components/group/People';
import Setting from 'components/group/Setting';
import getCroppedImg from 'tools/CropImage';

class GroupContainer extends Component {
  state = {
    state: {
      info: '',
      repositories: '',
      people: '',
    },
    info: {
      group_name: '',
      group_img: '',
      group_bgimg: '',
      group_intro: '',
      user_id: '',
    },
    repositories: {
      all: [],
    },
    people: [],
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
    const { groupId } = this.props;
    axios
      .post('/api/main/project/', { user_id: 0, group_id: groupId })
      .then(res => {
        this.setState(
          produce(draft => {
            const all = [];
            Object.keys(res.data).map(category => {
              res.data[category].map(repo => {
                all.push(repo);
              });
            });
            draft.state.repositories = 'success';
            draft.repositories = {
              ...res.data,
              all,
            };
          }),
        );
      });
    axios.post('/api/group_entry/', { group_id: groupId }).then(res => {
      this.setState(
        produce(draft => {
          draft.state.people = 'success';
          draft.people = res.data;
        }),
      );
    });
    axios.post('/api/group/detail/', { group_id: groupId }).then(res => {
      this.setState(
        produce(draft => {
          draft.state.info = 'success';
          draft.info = res.data;
        }),
      );
    });
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
    const { groupId, loggedUserId } = this.props;
    const {
      repositories,
      people,
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
    const { state, info } = this.state;
    const { url, menu, authState, groupId } = this.props;
    if (
      authState === 'success' &&
      state.info === 'success' &&
      state.repositories === 'success' &&
      state.people === 'success'
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
  loggedUserId: state.auth.userInfo.user_id,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupContainer);
