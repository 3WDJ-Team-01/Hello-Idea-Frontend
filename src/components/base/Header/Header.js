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

const Header = ({ searchTo, onLogout, onChange, userInfo }) => (
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
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchTo}
            onChange={onChange}
          />
          <div className={styles.searchResult}>
            {searchTo && (
              <Link to={`/search/${searchTo}`}>
                <div>
                  <MDBIcon icon="search" />
                  <span>{searchTo}</span>
                </div>
              </Link>
            )}
          </div>
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
              <DropdownMenu path={`/user/${userInfo.user_id}`}>
                <div className={styles.item}>Your profile</div>
              </DropdownMenu>
              <DropdownMenu path={`/user/${userInfo.user_id}/repositories`}>
                <div className={styles.item}>Your repositories</div>
              </DropdownMenu>
              <DropdownMenu isDivider />
              <DropdownMenu path={`/user/${userInfo.user_id}/modify`}>
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
