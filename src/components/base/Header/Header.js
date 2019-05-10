/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-duplicate-props */
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
import {
  MobileMenu,
  MobileMenuList,
  MobileTrigger,
  MobileWrapper,
} from 'components/base/Dropdown/MobileMenubar';
import { HeaderNotify } from 'components/base/Card/Notification';
import styles from './Header.module.scss';

const Header = ({
  history,
  searchTo,
  notifications,
  onClick,
  onLogout,
  onChange,
  userInfo,
  isNewMessage,
  handleReadAlerts,
}) => {
  const onKeyPress = e => {
    if (e.key === 'Enter') history.push(`/search/${searchTo}`);
  };

  return (
    <div className={styles.header_wrapper} onClick={onClick}>
      <div className={styles.header}>
        {/* Mobile env */}
        <div
          className={styles.mobileMenu}
          style={{ fontSize: '1.5rem', color: 'white' }}
        >
          <MobileWrapper>
            <MobileTrigger>
              <MDBIcon icon="bars" />
            </MobileTrigger>
            <MobileMenuList posRight="0">
              <MobileMenu>
                <div className={styles.item}>
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search..."
                    className="mobile"
                    value={searchTo}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
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
                </div>
              </MobileMenu>
              <MobileMenu isDivider />
              <MobileMenu path="/trends">
                <div className={styles.item}>Trends</div>
              </MobileMenu>
              <MobileMenu path="/explore">
                <div className={styles.item}>Explore</div>
              </MobileMenu>
              <MobileMenu isDivider />
              <MobileMenu path={`/user/${userInfo.user_id}`}>
                <div className={styles.item}>Your profile</div>
              </MobileMenu>
              <MobileMenu path={`/user/${userInfo.user_id}/repositories`}>
                <div className={styles.item}>Your repositories</div>
              </MobileMenu>
              <MobileMenu>
                <a href="/">
                  <div className={styles.item} onClick={onLogout}>
                    Sign out
                  </div>
                </a>
              </MobileMenu>
            </MobileMenuList>
          </MobileWrapper>
        </div>
        {/* Desktop env */}
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
              type="search"
              className="form-control"
              placeholder="Search..."
              value={searchTo}
              onChange={onChange}
              onKeyPress={onKeyPress}
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
            <Link to="/trends" className="headLink">
              <span>Trends</span>
            </Link>
            <Link to="/explore" className="headLink">
              <span>Explore</span>
            </Link>
          </div>
        </div>
        {/* Dropdown menus */}
        <div className={styles.menus}>
          <div className={styles.dropdown} onClick={handleReadAlerts}>
            <DropdownWrapper>
              <DropdownTrigger message={isNewMessage}>
                <MDBIcon icon="bell" />
              </DropdownTrigger>
              <DropdownMenuList>
                {notifications.map(
                  (notify, i) =>
                    i < 5 && (
                      <DropdownMenu key={i}>
                        <HeaderNotify
                          notify={notify}
                          loggedUserId={userInfo.user_id}
                        />
                      </DropdownMenu>
                    ),
                )}
                <DropdownMenu isDivider />
                <DropdownMenu path="/alert">
                  <div className={styles.more}>더보기</div>
                </DropdownMenu>
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
                <DropdownMenu path={`/user/${userInfo.user_id}/groups`}>
                  <div className={styles.item}>Your groups</div>
                </DropdownMenu>
                <DropdownMenu isDivider />
                <DropdownMenu path={`/user/${userInfo.user_id}/modify`}>
                  <div className={styles.item}>Settings</div>
                </DropdownMenu>
                <DropdownMenu>
                  <a href="/">
                    <div className={styles.item} onClick={onLogout}>
                      Sign out
                    </div>
                  </a>
                </DropdownMenu>
              </DropdownMenuList>
            </DropdownWrapper>
          </div>
          <div className={styles.mobileNotif} style={{ fontSize: '1.3rem' }}>
            <DropdownWrapper>
              <DropdownTrigger message>
                <MDBIcon icon="bell" />
              </DropdownTrigger>
              <DropdownMenuList>
                <DropdownMenu>알림1</DropdownMenu>
                <DropdownMenu>알림2</DropdownMenu>
                <DropdownMenu isDivider />
                <DropdownMenu>전체알림</DropdownMenu>
              </DropdownMenuList>
            </DropdownWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
