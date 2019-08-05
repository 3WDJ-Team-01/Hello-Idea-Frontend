/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import User from 'components/base/Card/User';
import { MDBBtn, MDBIcon } from 'mdbreact';
import styles from './People.module.scss';

const People = ({
  isInviting,
  userList,
  searchTo,
  master,
  isMaster,
  list,
  handleInvite,
  handleSearchTo,
  findUser,
  sendInvite,
}) => {
  return (
    <div className={styles.peopleList}>
      <div className={styles.options}>
        {isMaster ? (
          <MDBBtn color="primary" onClick={handleInvite}>
            <MDBIcon icon="user-plus" className="mr-1" />
            INVITE
          </MDBBtn>
        ) : null}
      </div>
      {list.map((item, i) => (
        <div className={styles.user} key={i}>
          <User value={item} />
          <span>{master.user_id === item.user_id ? 'Master' : 'Member'}</span>
        </div>
      ))}
      {isInviting === true ? (
        <div className={styles.invite}>
          <div>
            <div className={styles.title}>
              <span>Group invite</span>
              <span className={styles.close} onClick={handleInvite}>
                &times;
              </span>
            </div>
            <div className={styles.input}>
              <input
                type="email"
                className="form-control"
                placeholder="email"
                value={searchTo}
                onChange={handleSearchTo}
              />
              <MDBBtn color="primary" onClick={findUser}>
                SEARCH
              </MDBBtn>
            </div>
            <div className={styles.list}>
              {userList ? (
                <div onClick={sendInvite}>
                  <User value={userList} disable />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default People;
