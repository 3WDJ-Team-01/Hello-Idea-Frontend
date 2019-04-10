/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBIcon } from 'mdbreact';
import styles from './Header.module.scss';

const Header = ({ repository, exportMindmap }) => {
  return (
    <div className={styles.brainHeader}>
      <div className={styles.brainLeftHeader}>
        <div className={styles.brainLogo}>
          <Link to="/">
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/static.hello-idea.com/icons/global/logo.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className={styles.projectName}>ProjectName</div>
        <div className={styles.groupName}>GroupName</div>
      </div>
      <div className={styles.brainRightHeader}>
        <MDBBtn
          color="primary"
          onClick={() => {
            exportMindmap('#canvas');
          }}
        >
          <MDBIcon icon="file-download" className="mr-3" />
          다운로드
        </MDBBtn>
      </div>
    </div>
  );
};

export default Header;
