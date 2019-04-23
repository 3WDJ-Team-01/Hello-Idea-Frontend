import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import styles from './Header.module.scss';

const Header = ({ menu, user, info, shownProfile, modify }) => {
  return (
    <>
      <div
        className={styles.backgroundImg}
        style={{ backgroundColor: modify.bgColor }}
      />
      <div className={styles.userHeader}>
        <div
          className={styles.userProfileImg}
          style={shownProfile ? { opacity: 0 } : { opacity: 1 }}
        >
          {modify.imgSrc ? (
            <img
              className={styles.userImage}
              src={modify.imgSrc}
              alt="userprofile"
            />
          ) : (
            <div className={styles.userImage} />
          )}
        </div>
        <div className={styles.userDescWrapper}>
          <div className={styles.userProfileName}>
            {info.User_detail && info.User_detail.user_name}
          </div>
          <div className={styles.userDescription}>{}</div>
        </div>
        <Link to={`/user/${user}/modify`}>
          {menu === 'modify' ? (
            <MDBBtn color="elegant">EDIT</MDBBtn>
          ) : (
            <MDBBtn outline color="elegant">
              EDIT
            </MDBBtn>
          )}
        </Link>
      </div>
      <div className={styles.userNavWrapper}>
        <div>
          <div
            className={styles.profile}
            style={shownProfile ? { opacity: 1 } : { opacity: 0 }}
          >
            <div className={styles.userProfileImg}>
              {modify.imgSrc ? (
                <img
                  className={styles.userImage}
                  src={modify.imgSrc}
                  alt="userprofile"
                />
              ) : (
                <div className={styles.userImage} />
              )}
            </div>
            <div className={styles.name}>
              {info.User_detail && info.User_detail.user_name}
            </div>
          </div>
          <div className={styles.userNav}>
            <div>
              <NavMenu user={user} menu={menu} label="Overview" />
              <NavMenu
                user={user}
                menu={menu}
                path="/repositories"
                label="Repositories"
              />
              <NavMenu
                user={user}
                menu={menu}
                path="/followers"
                label="Followers"
              />
              <NavMenu
                user={user}
                menu={menu}
                path="/followings"
                label="Followings"
              />
              <NavMenu user={user} menu={menu} path="/groups" label="Groups" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const NavMenu = ({ user, menu, path = '', label }) => (
  <Link
    to={`/user/${user}${path}`}
    style={
      (!menu && label === 'Overview') || (path && menu === path.split('/')[1])
        ? {
            borderBottom: `3px solid #4285f4`,
            fontWeight: 500,
          }
        : {}
    }
  >
    {label}
  </Link>
);

export default Header;
