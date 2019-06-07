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
import { HeaderRequest } from 'components/base/Card/Request';
import styles from './Header.module.scss';

const Header = ({
  history,
  searchTo,
  requests,
  notifications,
  goSearch,
  onClick,
  onLogout,
  onChange,
  userInfo,
  isNewMessage,
  handleReadAlerts,
}) => {
  const onKeyPress = e => {
    if (e.key === 'Enter') goSearch();
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
                        <div onClick={goSearch}>
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
                <a href="/auth/login">
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
                  <div onClick={goSearch}>
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
                {requests.map(
                  (request, i) =>
                    i < 2 && (
                      <DropdownMenu key={i}>
                        <HeaderRequest request={request} />
                      </DropdownMenu>
                    ),
                )}
                {notifications.map(
                  (notify, i) =>
                    i < 3 && (
                      <DropdownMenu key={i}>
                        <HeaderNotify
                          notify={notify}
                          loggedUserId={userInfo.user_id}
                        />
                      </DropdownMenu>
                    ),
                )}
                <DropdownMenu isDivider />
                <DropdownMenu path="/alert/notifications">
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
                  <a href="/auth/login">
                    <div className={styles.item} onClick={onLogout}>
                      Sign out
                    </div>
                  </a>
                </DropdownMenu>
              </DropdownMenuList>
            </DropdownWrapper>
          </div>
          {/* 요기부터 */}
          <div className={styles.mobileNotif} onClick={handleReadAlerts}>
            <DropdownWrapper>
              <DropdownTrigger message={isNewMessage}>
                <MDBIcon icon="bell" />
              </DropdownTrigger>
              <DropdownMenuList>
                {requests.map(
                  (request, i) =>
                    i < 2 && (
                      <DropdownMenu key={i}>
                        <HeaderRequest request={request} />
                      </DropdownMenu>
                    ),
                )}
                {notifications.map(
                  (notify, i) =>
                    i < 3 && (
                      <DropdownMenu key={i}>
                        <HeaderNotify
                          notify={notify}
                          loggedUserId={userInfo.user_id}
                        />
                      </DropdownMenu>
                    ),
                )}
                <DropdownMenu isDivider />
                <DropdownMenu path="/alert/notifications">
                  <div className={styles.more}>더보기</div>
                </DropdownMenu>
              </DropdownMenuList>
            </DropdownWrapper>
            {/* 요기까지 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
