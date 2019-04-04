import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import styles from './Header.module.scss';

const Header = ({ url, user }) => {
  const category = url.split('/')[2];
  return (
    <>
      <div className={styles.backgroundImg}>img</div>
      <div className={styles.userHeader}>
        <div className={styles.userProfileImg}>
          <div>img</div>
        </div>
        <div className={styles.userDescWrapper}>
          <div className={styles.userProfileName}>
            <Link to="*/">UserName</Link>
          </div>
          <div className={styles.userDescription}>userDescription</div>
        </div>
        <Link to={`/${user}/modify`}>
          {category === 'modify' ? (
            <MDBBtn color="primary">EDIT</MDBBtn>
          ) : (
            <MDBBtn outline color="primary">
              EDIT
            </MDBBtn>
          )}
        </Link>
      </div>
      <div className={styles.userNavWrapper}>
        <div>
          <div className={styles.profile} />
          <div className={styles.userNav}>
            <Link
              to={`/${user}`}
              style={
                !category
                  ? { borderBottom: `3px solid #3498db`, fontWeight: 500 }
                  : {}
              }
            >
              Overview
            </Link>
            <Link
              to={`/${user}/repositories`}
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
              to={`/${user}/followers`}
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
              to={`/${user}/followings`}
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
