/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link, Route } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import styles from './New.module.scss';

const New = ({ user, url, Overview, Repositories, Followers, children }) => {
  return (
    <div className={styles.new}>
      <div className={styles.title}>Create a new repository</div>
      <hr />
      <div className={styles.article}>
        <div className={styles.section}>
          <div className={styles.label}>Owner</div>
          <select className="browser-default custom-select">
            <option value="Username">Username</option>
            <option value="Groupname_1">Groupname_1</option>
            <option value="Groupname_2">Groupname_2</option>
            <option value="Groupname_3">Groupname_3</option>
          </select>
        </div>
        <span>/</span>
        <div className={styles.section}>
          <label>
            <div className={styles.label}>Repository name</div>
            <input type="text" />
          </label>
        </div>
      </div>
      <div className={styles.article}>
        <div className={styles.section} style={{ width: '100%' }}>
          <label style={{ width: '100%' }}>
            <div className={styles.label}>Description</div>
            <textarea style={{ width: '100%' }} type="text" />
          </label>
        </div>
      </div>
      <hr />
      <div className={styles.article}>
        <MDBBtn disabled color="primary">
          Create repository
        </MDBBtn>
      </div>
    </div>
  );
};

export default New;
