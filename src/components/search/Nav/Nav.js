/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import styles from './Nav.module.scss';

const Nav = ({ type, handleType }) => {
  return (
    <div className={styles.repoCategory}>
      <ul>
        <li
          id="repositories"
          style={
            type === 'repositories'
              ? {
                  borderLeft: '3px solid #4285f4',
                  fontWeight: 500,
                }
              : {}
          }
          onClick={handleType}
        >
          Repositories
        </li>
        <li
          id="users"
          style={
            type === 'users'
              ? {
                  borderLeft: '3px solid #4285f4',
                  fontWeight: 500,
                }
              : {}
          }
          onClick={handleType}
        >
          Users
        </li>
        <li
          id="groups"
          style={
            type === 'groups'
              ? {
                  borderLeft: '3px solid #4285f4',
                  fontWeight: 500,
                }
              : {}
          }
          onClick={handleType}
        >
          Groups
        </li>
      </ul>
    </div>
  );
};

export default Nav;
