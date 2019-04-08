import React from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';
import styles from './Search.module.scss';

const Search = () => {
  return (
    <div className={styles.trendsSearch}>
      <h3>Take a look at the trend of search words for users</h3>
      <div className={styles.memberSearch}>
        <span className={styles.memberSear}>
          <input type="search" placeholder="Search ... " />
          <MDBBtn color="primary">
            <MDBIcon icon="search" /> Search
          </MDBBtn>
        </span>
      </div>
    </div>
  );
};

export default Search;
