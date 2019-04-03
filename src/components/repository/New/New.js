/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import styles from './New.module.scss';

const New = ({ name, desc, handleChange }) => {
  return (
    <div className={styles.new}>
      <div className={styles.title}>Create a new repository</div>
      <hr />
      <div className={styles.article}>
        <div className={styles.section}>
          <div className={styles.label}>
            <b>Owner</b>
          </div>
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
            <div className={styles.label}>
              <b>Repository name</b>
            </div>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={name}
            />
          </label>
        </div>
      </div>
      <div className={styles.article}>
        <div className={styles.section} style={{ width: '100%' }}>
          <label style={{ width: '100%' }}>
            <div className={styles.label}>
              <b>Description</b> (optinal)
            </div>
            <textarea
              name="desc"
              style={{ width: '100%' }}
              type="text"
              onChange={handleChange}
              value={desc}
            />
          </label>
        </div>
      </div>
      <hr />
      <div className={styles.article}>
        {name ? (
          <Link to="/user/repositories/repo/editor">
            <MDBBtn color="primary">Create repository</MDBBtn>
          </Link>
        ) : (
          <MDBBtn disabled color="primary">
            Create repository
          </MDBBtn>
        )}
      </div>
    </div>
  );
};

export default New;
