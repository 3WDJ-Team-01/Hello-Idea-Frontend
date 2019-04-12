/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import produce from 'immer';
import UserWrapper from 'components/user/UserWrapper';
import Header from 'components/user/Header';
import Overview from 'components/user/Overview';
import Repositories from 'components/user/Repositories';
import Following from 'components/user/Following';
import Modify from 'components/user/Modify';
import getCroppedImg from 'tools/CropImage';

class UserContainer extends Component {
  state = {
    displayColorPicker: false,
    shownProfile: false,
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
    window.addEventListener('scroll', () => {
      const { shownProfile } = this.state;
      if (!shownProfile && window.scrollY > 240) {
        this.setState(
          produce(draft => {
            draft.shownProfile = true;
          }),
        );
      } else if (shownProfile && window.scrollY < 300) {
        this.setState(
          produce(draft => {
            draft.shownProfile = false;
          }),
        );
      }
    });
  }

  componentWillUnmount() {}

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
  };

  /* COLOR PICKER ACTIONS */

  handleClick = () => {
    this.setState(
      produce(this.state, draft => {
        draft.displayColorPicker = !this.state.displayColorPicker;
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
      onCropChange,
      onCropComplete,
      onZoomChange,
      showCroppedImage,
      handleChange,
      handleClick,
      handleClose,
    } = this;
    const { cropper, modify, displayColorPicker } = this.state;
    switch (menu) {
      case 'repositories':
        return <Repositories />;
      case 'followers':
        return <Following />;
      case 'followings':
        return <Following />;
      case 'modify':
        return (
          <Modify
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
        return <Overview />;
    }
  };

  render() {
    const { renderMenu } = this;
    const { user, menu } = this.props;
    const { shownProfile, modify } = this.state;

    return (
      <>
        <Header
          menu={menu}
          user={user}
          shownProfile={shownProfile}
          modify={modify}
        />
        <UserWrapper>{renderMenu(menu)}</UserWrapper>
      </>
    );
  }
}

export default UserContainer;
