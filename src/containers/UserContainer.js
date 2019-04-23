/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import produce from 'immer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as userActions from 'store/modules/user';
import axios from 'axios';
import UserWrapper from 'components/user/UserWrapper';
import Header from 'components/user/Header';
import Overview from 'components/user/Overview';
import Repositories from 'components/user/Repositories';
import Following from 'components/user/Following';
import Groups from 'components/user/Groups';
import Modify from 'components/user/Modify';
import getCroppedImg from 'tools/CropImage';

class UserContainer extends Component {
  state = {
    repositoriesFilter: 'all',
    repositoriesSearchTo: '',
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
    const { user } = this.props;
    const { UserActions } = this.props;
    UserActions.userRequest(user);
    UserActions.targetGroupsRequest(user);
    UserActions.repositoriesRequest(user, 0);
    UserActions.followerRequest(user);

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

  componentDidUpdate(prevProps, prevState) {
    const { user, UserActions } = this.props;
    if (prevProps.user !== user) {
      UserActions.userRequest(user);
      UserActions.targetGroupsRequest(user);
      UserActions.repositoriesRequest(user, 0);
      UserActions.followerRequest(user);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => {
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

  /* REPOSITORIES ACTIONS */

  handleFilter = e => {
    e.persist();
    e.stopPropagation();

    this.setState(
      produce(draft => {
        draft.repositoriesFilter = e.target.attributes.name.nodeValue;
      }),
    );
  };

  handleSearchTo = e => {
    e.persist();

    this.setState(
      produce(draft => {
        draft.repositoriesSearchTo = e.target.value;
      }),
    );
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
      handleFilter,
      handleSearchTo,
    } = this;
    const {
      cropper,
      modify,
      displayColorPicker,
      repositoriesFilter,
      repositoriesSearchTo,
    } = this.state;
    const { info, groups, repositories, follower, following } = this.props;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    switch (menu) {
      case 'repositories':
        return (
          <Repositories
            loggedUser={userInfo.id}
            user={info.User_detail}
            repositories={repositories}
            filter={repositoriesFilter}
            searchTo={repositoriesSearchTo}
            handleFilter={handleFilter}
            handleSearchTo={handleSearchTo}
          />
        );
      case 'followers':
        return <Following list={follower} />;
      case 'followings':
        return <Following list={following} />;
      case 'groups':
        return <Groups list={groups} />;
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
        return <Overview loggedUser={userInfo.id} info={info} />;
    }
  };

  render() {
    const { renderMenu } = this;
    const { user, menu, info } = this.props;
    const { shownProfile, modify } = this.state;

    return (
      <>
        <Header
          menu={menu}
          user={user}
          info={info}
          shownProfile={shownProfile}
          modify={modify}
        />
        <UserWrapper>{renderMenu(menu)}</UserWrapper>
      </>
    );
  }
}
const mapStateToProps = state => ({
  state: state.user.state,
  info: state.user.info,
  groups: state.user.groups,
  repositories: state.user.repositories,
  follower: state.user.follower,
  following: state.user.following,
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(userActions, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(UserContainer),
);
