/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBIcon } from 'mdbreact';
import styles from './Header.module.scss';

const Header = ({ onLogout }) => (
  <div className={styles.header_wrapper}>
    <div className={styles.header}>
      <div>
        <Link to="/" className={styles.logo}>
          <img
            src="https://s3.ap-northeast-2.amazonaws.com/static.hello-idea.com/icons/global/logo.png"
            alt=""
          />
          <span>HelloIdea</span>
        </Link>

        <span className={styles.search}>
          <input
            type="email"
            className="form-control"
            placeholder="Search..."
          />
        </span>

        <div className={styles.link}>
          <Link to="/Trends" className="headLink">
            <span>Trends</span>
          </Link>
          <Link to="/Explore" className="headLink">
            <span>Explore</span>
          </Link>
        </div>
      </div>
      <div style={{ fontSize: '1.5rem', color: 'white' }}>
        <div className={styles.dropdown}>
          <details>
            <summary>
              <MDBIcon icon="bell" />
              <span />
            </summary>
            <div
              style={{
                width: '10rem',
                position: 'absolute',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  zIndex: 999,
                  left: '-7rem',
                  backgroundColor: 'green',
                }}
              >
                <div onClick={onLogout}>logout</div>
                <div>username_3</div>
                <div>username_4</div>
              </div>
            </div>
          </details>
        </div>

        <div className={styles.dropdown}>
          <details>
            <summary>
              <MDBIcon icon="user-alt" />
              <span />
            </summary>
            <div
              style={{
                width: '10rem',
                position: 'absolute',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  zIndex: 999,
                  left: '-7rem',
                  backgroundColor: 'green',
                }}
              >
                <div onClick={onLogout}>logout</div>
                <div>username_3</div>
                <div>username_4</div>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
