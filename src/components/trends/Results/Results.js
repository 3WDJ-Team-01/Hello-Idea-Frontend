import React from 'react';
import styles from './Results.module.scss';

const Results = () => {
  return (
    <div className={styles.trendsResultAll}>
      {/* 검색어 */}
      <div className={styles.searchWord}>
        검색어
        <h4>아두이노</h4>
      </div>

      <hr />

      {/* 관심도 변화 */}
      <div className={styles.changeInterest}>
        <h5>관심도 변화</h5>
        <div className={styles.changeInterestGraph}>그래프</div>
      </div>
      <hr />

      {/* 성별, 연령별 관심도 */}
      <div className={styles.typeInterest}>
        <h5>성별, 연령별 관심도</h5>
        <div className={styles.typeInterestGraph}>dd</div>
      </div>
      <hr />

      {/* 관련 두개 - 주제, 검색어 */}
      <div className={styles.topicNsearch}>
        {/* 관련 주제 */}
        <div className={styles.trendsTopic}>
          <h5>관련 주제</h5>
          <div className={styles.wordRanking}>
            <span>1</span> bbb <hr />
            <span>2</span> aaa <hr />
            <span>3</span> ccc
            <hr />
          </div>
          <div className={styles.changeRanking}>d</div>
        </div>
        {/* 관련 검색어 */}
        <div className={styles.trendsSearchWord}>
          <h5>관련 검색어</h5>
          <div className={styles.wordRanking}>
            <span>1</span> bbb <hr />
            <span>2</span> aaa <hr />
            <span>3</span> ccc
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Results;
