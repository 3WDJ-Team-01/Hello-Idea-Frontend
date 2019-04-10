import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBIcon } from 'mdbreact';
import styles from './Repository.module.scss';

const Repository = ({ userInfo, groups }) => {
  return (
    <div className={styles.repository}>
      <Header userInfo={userInfo} groups={groups} />
      <List>
        <Item userInfo={userInfo} />
        <Item userInfo={userInfo} />
        <Item userInfo={userInfo} />
        <Item userInfo={userInfo} />
        <Item userInfo={userInfo} />
        <Item userInfo={userInfo} />
        <div className={styles.moreRepository}>
          <Link to={`/user/${userInfo.user_id}/repositories`}>
            <MDBIcon icon="folder-open" />
            See more repositories
          </Link>
        </div>
      </List>
    </div>
  );
};

const Header = ({ userInfo, groups }) => (
  <div className={styles.header}>
    <div>
      <select className="browser-default custom-select">
        {<option value={userInfo.user_id}>{userInfo.user_name}</option>}
        {groups.map(group => (
          <option key={group.group_id} value={group.group_id}>
            {group.group_name}
          </option>
        ))}
      </select>
      <span>/</span>
      <input type="text" className="form-control" placeholder="저장소 이름" />
    </div>
    <Link to={`/user/${userInfo.user_id}/new`}>
      <MDBBtn color="primary">
        <MDBIcon icon="edit" className="mr-1" />
        NEW
      </MDBBtn>
    </Link>
  </div>
);

const List = ({ children }) => (
  <div className={styles.idealist}>
    <div>{children}</div>
  </div>
);

const Item = ({ userInfo }) => (
  <div className={styles.ideabox}>
    <div className={styles.ideaimg} />
    <div className={styles.ideahov}>
      <div className={styles.ideaopen}>
        <Link to={`/user/${userInfo.user_id}/repositories/repo/editor`}>
          open
        </Link>
      </div>
      <div className="ideamore">
        <Link to={`/user/${userInfo.user_id}/repositories/repo`}>more</Link>
      </div>
    </div>
  </div>
);

export default Repository;
