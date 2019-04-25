/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBIcon } from 'mdbreact';
import styles from './Search.module.scss';

const Search = ({ keyword, recentlyKeywords, handleKeyword, handleSearch }) => {
  const onKeyPress = e => {
    if (e.key === 'Enter') handleSearch(e);
  };
  return (
    <>
      <div className={styles.trendsSearch}>
        <h3>사용자들의 검색어 동향을 살펴보세요</h3>
        <div className={styles.input}>
          <input
            type="search"
            value={keyword}
            onChange={handleKeyword}
            onKeyPress={onKeyPress}
            placeholder="Search to keyword ... "
          />
          <MDBBtn color="primary" onClick={handleSearch}>
            <MDBIcon icon="search" className="mr-1" /> Search
          </MDBBtn>
        </div>
      </div>
      <div className={styles.recentlyKeywords}>
        <h4>최근 검색어</h4>
        <div className={styles.list}>
          {recentlyKeywords.map((item, i) => (
            <Link key={i} to={`/trends/${item}`} onClick={handleSearch}>
              <div className={styles.item}>{item}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
