/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link, Route } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import styles from './Header.module.scss';

const Header = ({ repository }) => {
  return (
    <div className={styles.brainHeader}>
      {/* logo */}
      <Link to="/*" className={styles.brainLogo}>
        <img
          src="https://s3.ap-northeast-2.amazonaws.com/static.hello-idea.com/icons/global/logo.png"
          alt="logo"
        />
      </Link>

      <div className={styles.projectName}>ProjectName</div>
      <div className={styles.groupName}>GroupName</div>

      {/* header */}
      <div className={styles.brainRightHeader}>
        <ul className={styles.brainHeadUl}>
          <li>
            <Link to="/*" className={styles.brainHeadLink}>
              Print
            </Link>
            <div className="dropdown">
              <Link to="/*" data-toggle="dropdown" className="dropdown-toggle">
                Save
              </Link>
            </div>
          </li>

          <li>
            <div className="dropdown">
              <Link to="/*" data-toggle="dropdown" className="dropdown-toggle">
                Share
              </Link>
            </div>
          </li>

          <li>
            <Link to="/*" className={styles.brainHeadLink}>
              <img src="./images/notification.png" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
