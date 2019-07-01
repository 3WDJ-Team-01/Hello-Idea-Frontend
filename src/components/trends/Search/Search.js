/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBIcon } from 'mdbreact';
import ProgressIndicator from 'components/base/ProgressIndicator';
import { ja } from 'data/locale';
import styles from './Search.module.scss';

const Search = ({
  state,
  keyword,
  recentlyKeywords,
  handleKeyword,
  handleSearch,
}) => {
  const onKeyPress = e => {
    if (e.key === 'Enter') handleSearch(e);
  };
  return (
    <>
      <div className={styles.trendsSearch}>
        <h3>{ja.trend.title}</h3>
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
        {state === 'success' ? (
          <>
            <h4>{ja.trend.recent}</h4>
            <div className={styles.list}>
              {recentlyKeywords.map((item, i) => (
                <Link key={i} to={`/trends/${item}`} onClick={handleSearch}>
                  <div className={styles.item}>{item}</div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <ProgressIndicator mini />
        )}
      </div>
    </>
  );
};

export default Search;
