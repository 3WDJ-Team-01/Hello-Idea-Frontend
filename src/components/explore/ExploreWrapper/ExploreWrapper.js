import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ExploreWrapper.module.scss';

const ExploreWrapper = ({ news, children }) => {
  return (
    <div className={styles.explore}>
      <div className={styles.newsWrapper}>
        <div className={styles.newsList}>
          {news[0] && (
            <div className={styles.newsSide}>
              <a href={`${news[1].img_href}`}>
                <img src={`${news[0].img_src.split('?')[0]}`} />
                <div className={styles.label}>
                  <span>{news[0].Comment}</span>
                </div>
              </a>
            </div>
          )}
          {news[1] && (
            <div className={styles.newsMain}>
              <a href={`${news[1].img_href}`}>
                <img src={news[1] && `${news[1].img_src.split('?')[0]}`} />
                <div className={styles.label}>
                  <span>{news[1].Comment}</span>
                </div>
              </a>
            </div>
          )}
          {news[2] && (
            <div className={styles.newsSide}>
              <a href={`${news[1].img_href}`}>
                <img src={news[2] && `${news[2].img_src.split('?')[0]}`} />
                <div className={styles.label}>
                  <span>{news[2].Comment}</span>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
      <div className={styles.listWrapper}>{children}</div>
    </div>
  );
};

export default ExploreWrapper;
