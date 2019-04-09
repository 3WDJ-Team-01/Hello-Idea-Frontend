import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import styles from './Header.module.scss';

const Header = ({ url, user, shownProfile, modify }) => {
  const category = url.split('/')[3];
  return (
    <>
      <div
        className={styles.backgroundImg}
        style={{ backgroundColor: modify.bgColor }}
      />
      <div className={styles.userHeader}>
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
        <div className={styles.userDescWrapper}>
          <div className={styles.userProfileName}>
            <Link to="*/">UserName</Link>
          </div>
          <div className={styles.userDescription}>userDescription</div>
        </div>
        <Link to={`/user/${user}/modify`}>
          {category === 'modify' ? (
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
            <div className={styles.name}>UserName</div>
          </div>
          <div className={styles.userNav}>
            <Link
              to={`/user/${user}`}
              style={
                !category
                  ? { borderBottom: `3px solid #3498db`, fontWeight: 500 }
                  : {}
              }
            >
              Overview
            </Link>
            <Link
              to={`/user/${user}/repositories`}
              style={
                category === 'repositories'
                  ? {
                      borderBottom: `3px solid #4285f4`,
                      fontWeight: 500,
                    }
                  : {}
              }
            >
              Repositories
            </Link>
            <Link
              to={`/user/${user}/followers`}
              style={
                category === 'followers'
                  ? {
                      borderBottom: `3px solid #4285f4`,
                      fontWeight: 500,
                    }
                  : {}
              }
            >
              Followers
            </Link>
            <Link
              to={`/user/${user}/followings`}
              style={
                category === 'followings'
                  ? {
                      borderBottom: `3px solid #4285f4`,
                      fontWeight: 500,
                    }
                  : {}
              }
            >
              Followings
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
