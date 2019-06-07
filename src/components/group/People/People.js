/* eslint-disable react/no-array-index-key */
import React from 'react';
import User from 'components/base/Card/User';
import { MDBBtn, MDBIcon } from 'mdbreact';
import styles from './People.module.scss';

const People = ({ master, isMaster, list }) => {
  return (
    <div className={styles.peopleList}>
      <div className={styles.options}>
        {isMaster ? (
          <MDBBtn color="primary">
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
    </div>
  );
};

export default People;
