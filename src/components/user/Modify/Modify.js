/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link, Route } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import styles from './Modify.module.scss';

const FileInput = ({ label }) => (
  <label>
    <div>{label}</div>
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroupFileAddon01">
          Upload
        </span>
      </div>
      <div className="custom-file">
        <input
          type="file"
          className="custom-file-input"
          id="inputGroupFile01"
          aria-describedby="inputGroupFileAddon01"
        />
        <label className="custom-file-label" htmlFor="inputGroupFile01">
          Choose file
        </label>
      </div>
    </div>
  </label>
);

const Profile = () => (
  <div className={styles.section}>
    <div className={styles.title}>Public profille</div>
    <hr />
    <div className={styles.paragraph}>
      <label>
        <div>Name</div>
        <input type="text" />
      </label>
    </div>
    <div className={styles.paragraph}>
      <label>
        <div>bio</div>
        <textarea type="text" />
      </label>
    </div>
    <div className={styles.paragraph}>
      <FileInput label="Profile picture" />
    </div>
    <div className={styles.paragraph}>
      <FileInput label="Profile wallpaper" />
    </div>
    <div>
      <MDBBtn>update profile</MDBBtn>
    </div>
  </div>
);

const Account = () => (
  <>
    <div className={styles.section}>
      <div className={styles.title}>Change password</div>
      <hr />
      <div className={styles.paragraph}>
        <label>
          <div>Old Password</div>
          <input type="password" />
        </label>
      </div>

      <div className={styles.paragraph}>
        <label>
          <div>New Password</div>
          <input type="password" />
        </label>
      </div>

      <div className={styles.paragraph}>
        <label>
          <div>Confirm New Password</div>
          <input type="password" />
        </label>
      </div>
      <div>
        <MDBBtn>Update password</MDBBtn>
      </div>
    </div>
    <div className={styles.section}>
      <div className={`${styles.title} ${styles.caution}`}>Delete Account</div>
      <hr />
      <MDBBtn className={styles.caution}>Delete Your Account</MDBBtn>
    </div>
  </>
);

const Modify = ({ user, url, Overview, Repositories, Followers, children }) => {
  return (
    <div className={styles.modify}>
      <Profile />
      <Account />
    </div>
  );
};

export default Modify;
