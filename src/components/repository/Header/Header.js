import React from 'react';
import { Link } from 'react-router-dom';
import { MDBIcon } from 'mdbreact';
import styles from './Header.module.scss';

const Header = ({ url, user, menu }) => {
  return (
    <div className={styles.repoHeader}>
      <div>
        <div className={styles.repoPath}>
          <span>
            <MDBIcon icon="folder-open" />
          </span>
          <span>
            <Link to="*/">UserName</Link>
          </span>
          <span>/</span>
          <span>
            <Link to="*/">test1</Link>
          </span>
        </div>
        <div className={styles.userNavWrapper}>
          <div className={styles.userNav}>
            <Link
              to={`/${user}/repositories/test1`}
              style={
                !menu
                  ? {
                      borderTop: `3px solid #4285f4`,
                      borderBottom: 'none',
                      backgroundColor: 'white',
                      fontWeight: 500,
                    }
                  : { border: 'none' }
              }
            >
              <div className={styles.MyPageOverview}>Overview</div>
            </Link>
            <Link
              to={`/${user}/repositories/test1/settings`}
              style={
                menu === 'settings'
                  ? {
                      borderTop: `3px solid #4285f4`,
                      borderBottom: 'none',
                      backgroundColor: 'white',
                      fontWeight: 500,
                    }
                  : { border: 'none' }
              }
            >
              <div className={styles.MyPageRepositories}>Settings</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
