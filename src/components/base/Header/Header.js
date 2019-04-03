/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBIcon } from 'mdbreact';
import {
  DropdownMenu,
  DropdownMenuList,
  DropdownTrigger,
  DropdownWrapper,
} from 'components/base/Dropdown/Dropdown';
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
          <DropdownWrapper>
            <DropdownTrigger caret>
              <MDBIcon icon="bell" />
            </DropdownTrigger>
            <DropdownMenuList>
              <DropdownMenu>Your profasdasdasdasdile</DropdownMenu>
              <DropdownMenu>Your repositories</DropdownMenu>
              <DropdownMenu isDivider />
              <DropdownMenu>Settings</DropdownMenu>
              <DropdownMenu onClick={onLogout}>Sign out</DropdownMenu>
            </DropdownMenuList>
          </DropdownWrapper>
        </div>

        <div className={styles.dropdown}>
          <DropdownWrapper>
            <DropdownTrigger caret>
              <MDBIcon icon="user-alt" />
            </DropdownTrigger>
            <DropdownMenuList>
              <DropdownMenu>
                <div className={styles.item}>Your profile</div>
              </DropdownMenu>
              <DropdownMenu>
                <div className={styles.item}>Your repositories</div>
              </DropdownMenu>
              <DropdownMenu isDivider />
              <DropdownMenu>
                <div className={styles.item}>Settings</div>
              </DropdownMenu>
              <DropdownMenu>
                <div className={styles.item} onClick={onLogout}>
                  Sign out
                </div>
              </DropdownMenu>
            </DropdownMenuList>
          </DropdownWrapper>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
