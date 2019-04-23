/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBIcon } from 'mdbreact';
import Repository from 'components/base/Card/Repository';
import styles from './Repositories.module.scss';

const Repositories = ({
  user,
  repositories,
  filter,
  searchTo,
  handleFilter,
  handleSearchTo,
}) => {
  if (user)
    return (
      <div className={styles.repositoriesWrapper}>
        <div className={styles.repoCategory}>
          <div>Category</div>
          <ul>
            {Object.keys(repositories)
              .reverse()
              .map((key, i) => (
                <li
                  key={i}
                  name={key}
                  onClick={handleFilter}
                  style={
                    filter === key
                      ? {
                          borderLeft: '3px solid #4285f4',
                          fontWeight: 500,
                        }
                      : {}
                  }
                >
                  <span name={key} className={styles.label}>
                    {key}
                  </span>
                  <span name={key} className={styles.count}>
                    ({repositories[key].length})
                  </span>
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.repositories}>
          <div className={styles.search}>
            <Link to={`/user/${user.user_id}/new`}>
              <MDBBtn color="primary">
                <MDBIcon icon="edit" className="mr-1" />
                NEW
              </MDBBtn>
            </Link>
            <input
              type="text"
              value={searchTo}
              onChange={handleSearchTo}
              placeholder="Find a repository..."
            />
          </div>
          {repositories[filter].map((repository, i) => {
            const target = new RegExp(searchTo);
            if (target.test(repository.project_topic))
              return (
                <Repository key={i} author={user.user_id} value={repository} />
              );
          })}
        </div>
      </div>
    );
};

export default Repositories;
