import React from 'react';
import styles from './ExploreWrapper.module.scss';

const ExploreWrapper = ({ news, children }) => {
  return (
    <div className={styles.explore}>
      <div className={styles.newsWrapper}>
        <div className={styles.newsList}>
          {news[0] && (
            <div className={styles.newsSide}>
              <a
                href={news[0].href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={
                    typeof news[0].img === 'string' &&
                    news[0].img.split('?')[0]
                  }
                  alt={news[0].title}
                />
                <div className={styles.label}>
                  <span>{news[0].title}</span>
                </div>
              </a>
            </div>
          )}
          {news[1] && (
            <div className={styles.newsMain}>
              <a
                href={news[1].href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={
                    typeof news[1].img === 'string' &&
                    news[1].img.split('?')[0]
                  }
                  alt={news[1].title}
                />
                <div className={styles.label}>
                  <span>{news[1].title}</span>
                </div>
              </a>
            </div>
          )}
          {news[2] && (
            <div className={styles.newsSide}>
              <a
                href={news[2].href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={
                    typeof news[2].img === 'string' &&
                    news[2].img.split('?')[0]
                  }
                  alt={news[2].title}
                />
                <div className={styles.label}>
                  <span>{news[2].title}</span>
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
