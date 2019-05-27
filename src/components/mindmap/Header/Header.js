/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';
import styles from './Header.module.scss';

const Header = ({ type, info, repository, exportMindmap, onClick }) => {
  return (
    <div className={styles.brainHeader}>
      <div className={styles.brainLeftHeader}>
        <div className={styles.brainLogo} onClick={onClick}>
          <img
            src="https://s3.ap-northeast-2.amazonaws.com/static.hello-idea.com/icons/global/logo.png"
            alt="logo"
          />
        </div>
        <div className={styles.projectName}>{info.project_topic}</div>
        {type === 'group' ? (
          <div className={styles.groupName}>{info.author}</div>
        ) : null}
      </div>
      <div className={styles.brainRightHeader}>
        <MDBBtn color="primary" onClick={exportMindmap}>
          <MDBIcon icon="file-download" className="mr-3" />
          다운로드
        </MDBBtn>
      </div>
    </div>
  );
};

export default Header;
