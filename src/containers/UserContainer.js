/* eslint-disable eqeqeq */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import produce from 'immer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as userActions from 'store/modules/user';
import * as authActions from 'store/modules/auth';
import * as alertActions from 'store/modules/alert';
import axios from 'axios';
import ProgressIndicator from 'components/base/ProgressIndicator';
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
    isFollow: false,
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
      name: '',
      bio: '',
    },
  };

  componentDidMount() {
    const { user } = this.props;
    const { UserActions } = this.props;

    UserActions.userRequest(user).then(() => {
      const { User_detail } = this.props.info;
      this.setState(
        produce(draft => {
          draft.modify.name = User_detail.user_name;
          draft.modify.bio = User_detail.user_intro;
          draft.modify.bgColor = User_detail.user_bgimg;
        }),
      );
    });
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loggedUserRelation.followings) {
      return {
        isFollow:
          nextProps.loggedUserRelation.followings.findIndex(
            following => following.user_id == nextProps.user,
          ) > -1,
      };
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { initialize } = this;
    const { user, UserActions } = this.props;
    const { isFollow } = this.state;

    if (prevProps.user !== user) {
      initialize().then(() => {
        UserActions.userRequest(user);
        UserActions.targetGroupsRequest(user);
        UserActions.repositoriesRequest(user, 0);
        UserActions.followerRequest(user);
      });
    }
    if (prevState.isFollow !== isFollow) {
      UserActions.followerRequest(user);
    }
  }

  componentWillUnmount() {
    const { initialize } = this;

    initialize();

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

  initialize = () =>
    new Promise((res, rej) => {
      const { UserActions } = this.props;
      UserActions.initialize();
      res();
    });

  /* === Actions start === */
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
    const { updateIMG } = this;
    const { user } = this.props;
    const { imgSrc, croppedAreaPixels } = this.state.cropper;
    const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
    await updateIMG(user, croppedImage);
    this.setState(
      produce(draft => {
        draft.modify.imgSrc = URL.createObjectURL(croppedImage);
      }),
    );
  };

  updateIMG = (user_id, blob) =>
    new Promise((res, rej) => {
      const data = new FormData();
      data.append('user_img', blob, `user_${user_id}.png`);
      data.append('user_id', user_id);
      axios
        .post('/api/user_img/update/', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => res())
        .catch(err => rej(err));
    });

  /* HEADER ACTIONS */
  handleFollow = e => {
    e.persist();
    const {
      user,
      loggedUserId,
      loggedUserFollowers,
      AuthActions,
      AlertActions,
    } = this.props;
    const { isFollow } = this.state;

    if (!isFollow) {
      axios
        .post('/api/follow/insert/', {
          user_id: loggedUserId,
          partner_id: user,
        })
        .then(() => {
          AlertActions.sendNotify({
            type: 'follow',
            send_id: loggedUserId,
            receive_id: [user, ...loggedUserFollowers],
            target_id: user,
          });
          this.setState(
            produce(draft => {
              draft.isFollow = true;
            }),
          );
        });
    } else {
      axios
        .post('/api/follow/delete/', {
          user_id: loggedUserId,
          partner_id: user,
        })
        .then(() => {
          this.setState(
            produce(draft => {
              draft.isFollow = false;
            }),
          );
        });
    }

    AuthActions.userRequest();
  };

  /* MODIFY ACTIONS */

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
      this.setState(
        produce(draft => {
          draft.modify[e.target.name] = e.target.value;
        }),
      );
    }
  };

  handleUpdate = () => {
    const { user, UserActions } = this.props;
    const { bgColor, name, bio } = this.state.modify;
    axios
      .post('/api/user/update/', {
        user_id: user,
        user_intro: bio,
        user_bgimg: bgColor,
        user_name: name,
      })
      .then(() => {
        UserActions.userRequest(user).then(() => {
          const { User_detail } = this.props.info;
          this.setState(
            produce(draft => {
              draft.modify.name = User_detail.user_name;
              draft.modify.bio = User_detail.user_intro;
              draft.modify.bgColor = User_detail.user_bgimg;
            }),
          );
        });
      });
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

  /* === Actions end === */

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
      handleUpdate,
    } = this;
    const {
      cropper,
      modify,
      displayColorPicker,
      repositoriesFilter,
      repositoriesSearchTo,
    } = this.state;
    const {
      loggedUserId,
      info,
      groups,
      repositories,
      follower,
      following,
      loggedUserRelation,
    } = this.props;

    switch (menu) {
      case 'repositories':
        return (
          <Repositories
            loggedUser={loggedUserId}
            user={info.User_detail}
            repositories={repositories}
            filter={repositoriesFilter}
            searchTo={repositoriesSearchTo}
            handleFilter={handleFilter}
            handleSearchTo={handleSearchTo}
          />
        );
      case 'followers':
        return (
          <Following
            list={follower}
            loggedUserFollowings={loggedUserRelation.followings}
          />
        );
      case 'followings':
        return (
          <Following
            list={following}
            loggedUserFollowings={loggedUserRelation.followings}
          />
        );
      case 'groups':
        return (
          <Groups list={groups} loggedUserGroups={loggedUserRelation.groups} />
        );
      case 'modify':
        return (
          <Modify
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
            handleUpdate={handleUpdate}
          />
        );
      default:
        return <Overview loggedUser={loggedUserId} info={info} />;
    }
  };

  render() {
    const { renderMenu, handleFollow } = this;
    const { authState, userState, loggedUserId, user, menu, info } = this.props;
    const { isFollow, shownProfile, modify } = this.state;
    if (
      authState === 'success' &&
      userState.info === 'success' &&
      userState.group === 'success' &&
      userState.repositories === 'success' &&
      userState.follower === 'success'
    )
      return (
        <>
          <Header
            loggedUser={loggedUserId}
            isFollow={isFollow}
            menu={menu}
            user={user}
            info={info}
            shownProfile={shownProfile}
            modify={modify}
            handleFollow={handleFollow}
          />
          <UserWrapper>{renderMenu(menu)}</UserWrapper>
        </>
      );
    return <ProgressIndicator />;
  }
}

const mapStateToProps = state => ({
  authState: state.auth.state,
  loggedUserId: state.auth.userInfo.user_id,
  userState: state.user.state,
  loggedUserFollowers: state.auth.relation.followersId,
  info: state.user.info,
  groups: state.user.groups,
  repositories: state.user.repositories,
  follower: state.user.follower,
  following: state.user.following,
  loggedUserRelation: state.auth.relation,
});

const mapDispatchToProps = dispatch => ({
  AuthActions: bindActionCreators(authActions, dispatch),
  UserActions: bindActionCreators(userActions, dispatch),
  AlertActions: bindActionCreators(alertActions, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(UserContainer),
);
