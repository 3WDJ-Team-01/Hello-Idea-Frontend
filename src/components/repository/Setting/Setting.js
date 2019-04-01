/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link, Route } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import styles from './Setting.module.scss';

const Setting = ({
  user,
  url,
  Overview,
  Repositories,
  Followers,
  children,
}) => {
  return (
    <div className={styles.modify}>
      <div className={styles.section}>
        <div className={styles.title}>Repository name</div>
        <hr />
        <div>
          <label>
            <div>Changed name</div>
            <input type="text" />
          </label>
          <MDBBtn>Rename</MDBBtn>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>Repository description</div>
        <hr />
        <div>
          <label>
            <div>Changed description</div>
            <textarea type="text" />
          </label>
          <MDBBtn>save</MDBBtn>
        </div>
      </div>
      <div className={styles.section}>
        <div className={`${styles.title} ${styles.caution}`}>
          Delete repository
        </div>
        <hr />
        <MDBBtn className={styles.caution}>Delete Your repository</MDBBtn>
      </div>
    </div>
  );
};

export default Setting;
