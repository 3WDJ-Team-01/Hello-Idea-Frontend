/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { MDBBtn } from 'mdbreact';
import styles from './Setting.module.scss';

const Setting = ({
  name,
  description,
  handleChange,
  handleSubmit,
  handleRemove,
}) => {
  return (
    <div className={styles.modify}>
      <div className={styles.section}>
        <div className={styles.title}>Repository Info</div>
        <hr />
        <div className={styles.input}>
          <label>
            <div>Change name</div>
            <input
              name="name"
              type="text"
              value={name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.input}>
          <label>
            <div>Change description</div>
            <textarea
              name="description"
              type="text"
              value={description}
              onChange={handleChange}
            />
          </label>
          <MDBBtn onClick={handleSubmit}>save</MDBBtn>
        </div>
      </div>
      <div className={styles.section}>
        <div className={`${styles.title} ${styles.caution}`}>
          Delete repository
        </div>
        <hr />
        <MDBBtn onClick={handleRemove} className={styles.caution}>
          Delete Your repository
        </MDBBtn>
      </div>
    </div>
  );
};

export default Setting;
