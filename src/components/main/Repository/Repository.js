/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBIcon } from 'mdbreact';
import styles from './Repository.module.scss';

const Repository = ({ userInfo, groups, repositories, handleChageUser }) => {
  return (
    <div className={styles.repository}>
      <Header
        userInfo={userInfo}
        groups={groups}
        handleChageUser={handleChageUser}
      />
      <List>
        {repositories.map((repository, i) => (
          <Item key={i} userInfo={userInfo} repository={repository} />
        ))}
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

const Header = ({ userInfo, groups, handleChageUser }) => (
  <div className={styles.header}>
    <div>
      <select
        className="browser-default custom-select"
        onChange={handleChageUser}
      >
        <option value="personal">{userInfo.user_name}</option>
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

const Item = ({ userInfo, repository }) => (
  <div className={styles.ideabox}>
    <div className={styles.ideaimg} />
    <div className={styles.ideahov}>
      <div className={styles.idealabel}>
        <div className={styles.title}>{repository.project_topic}</div>
        <div className={styles.options}>
          <Link
            className={styles.box}
            to={`/user/${userInfo.user_id}/repositories/${
              repository.project_id
            }/editor`}
          >
            open
          </Link>
          <Link
            to={`/user/${userInfo.user_id}/repositories/${
              repository.project_id
            }`}
          >
            more+
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Repository;
