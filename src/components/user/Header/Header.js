import React from 'react';
import { Link, Route } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import styles from './Header.module.scss';

const Header = ({ url, user }) => {
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
        <Link to="/Modify">
          <MDBBtn outline color="primary">
            EDIT
          </MDBBtn>
        </Link>
      </div>
      <div className={styles.userNavWrapper}>
        <div>
          <div className={styles.profile} />
          <div className={styles.userNav}>
            <Link to={`${url}/Overview`}>
              <div className={styles.MyPageOverview}>Overview</div>
            </Link>
            <Link to={`${url}/Repositories`}>
              <div className={styles.MyPageRepositories}>Repositories</div>
            </Link>
            <Link to={`${url}/Followers`}>
              <div className={styles.MyPageFollowers}>Followers</div>
            </Link>
            <Link to={`${url}/Followings`}>
              <div className={styles.MyPageFollowing}>Followings</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
