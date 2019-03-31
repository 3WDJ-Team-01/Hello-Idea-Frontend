/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link, Route } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import styles from './Modify.module.scss';

const Modify = ({ user, url, Overview, Repositories, Followers, children }) => {
  return (
    <div className={styles.modify}>
      <div className={styles.section}>
        <div className={styles.title}>Change password</div>
        <hr />
        <div>
          <label>
            <div>Old Password</div>
            <input id="currentPW" type="password" />
          </label>
        </div>

        <div>
          <label>
            <div>New Password</div>
            <input type="password" />
          </label>
        </div>

        <div>
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
        <div className={`${styles.title} ${styles.caution}`}>
          Delete Account
        </div>
        <hr />
        <MDBBtn className={styles.caution}>Delete Your Account</MDBBtn>
      </div>
    </div>
  );
};

export default Modify;
