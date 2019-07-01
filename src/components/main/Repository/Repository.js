/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBIcon } from 'mdbreact';
import styles from './Repository.module.scss';

const Repository = ({
  userInfo,
  groups,
  owner,
  repositories,
  filter,
  searchTo,
  handleChageUser,
  handleFilter,
  handleSearchTo,
}) => {
  return (
    <div className={styles.repository}>
      <Header
        userInfo={userInfo}
        groups={groups}
        searchTo={searchTo}
        filter={filter}
        handleFilter={handleFilter}
        repositories={repositories}
        handleSearchTo={handleSearchTo}
        handleChageUser={handleChageUser}
      />
      <List>
        {repositories[filter].map((repository, i) => {
          const target = new RegExp(searchTo);
          if (target.test(repository.project_topic))
            return (
              <Item
                key={i}
                owner={owner}
                userInfo={userInfo}
                repository={repository}
              />
            );
        })}
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

const Header = ({
  userInfo,
  groups,
  repositories,
  searchTo,
  filter,
  handleFilter,
  handleSearchTo,
  handleChageUser,
}) => (
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
      <input
        type="text"
        value={searchTo}
        onChange={handleSearchTo}
        className="form-control"
        placeholder="Repository"
      />
      <select
        className={`browser-default custom-select ${styles.filter}`}
        onChange={handleFilter}
      >
        {Object.keys(repositories)
          .reverse()
          .map((key, i) => (
            <option key={i} value={key}>
              {`${key} (${repositories[key].length})`}
            </option>
          ))}
      </select>
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

const Item = ({ userInfo, repository, owner }) => (
  <div className={styles.ideabox}>
    <div className={styles.ideaimg}>
      <img src={repository.project_img} alt={repository.project_img} />
    </div>
    <div className={styles.ideahov}>
      <div className={styles.idealabel}>
        <div className={styles.title}>{repository.project_topic}</div>
        <div className={styles.options}>
          <Link
            className={styles.box}
            to={`/${owner.type}/${owner.id}/repositories/${
              repository.project_id
            }/editor`}
          >
            open
          </Link>
          <Link
            to={`/${owner.type}/${owner.id}/repositories/${
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
