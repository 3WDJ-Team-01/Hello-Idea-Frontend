/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBIcon } from 'mdbreact';
import styles from './Header.module.scss';

const Header = ({ url, menu, groupId }) => {
  return (
    <div className={styles.groupHeader}>
      <div>
        <div className={styles.groupTitle}>
          <div className={styles.emblem} />
          <div className={styles.name}>test</div>
        </div>
        <div className={styles.groupNavWrapper}>
          <div className={styles.groupNav}>
            <Link
              to={`/group/${groupId}`}
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
              <div className={styles.MyPageOverview}>Repositories</div>
            </Link>
            <Link
              to={`/group/${groupId}/people`}
              style={
                menu === 'people'
                  ? {
                      borderTop: `3px solid #4285f4`,
                      borderBottom: 'none',
                      backgroundColor: 'white',
                      fontWeight: 500,
                    }
                  : { border: 'none' }
              }
            >
              <div className={styles.MyPageRepositories}>People</div>
            </Link>
            <Link
              to={`/group/${groupId}/settings`}
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
