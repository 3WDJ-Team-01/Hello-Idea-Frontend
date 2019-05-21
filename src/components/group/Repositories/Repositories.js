/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBIcon } from 'mdbreact';
import Repository from 'components/base/Card/Repository';
import styles from './Repositories.module.scss';

const Repositories = ({
  groupId,
  repositories,
  filter,
  searchTo,
  handleFilter,
  handleSearchTo,
}) => {
  return (
    <div className={styles.repositoriesWrapper}>
      <div className={styles.repositories}>
        <div className={styles.search}>
          <Link to={`/group/${groupId}/new`}>
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
          <select
            className="browser-default custom-select"
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
        {repositories[filter].map((repository, i) => {
          const target = new RegExp(searchTo);
          if (target.test(repository.project_topic))
            return (
              <Repository key={i} isGroup author={groupId} value={repository} />
            );
        })}
      </div>
    </div>
  );
};

export default Repositories;
