import React from 'react';
import styles from './MainWrapper.module.scss';

const MainWrapper = () => {
  return (
    <div className={styles.main_wrapper}>
      <div className={styles.aside}>
        <div className={styles.account}>
          <details>
            <summary>username_1</summary>
            <div>
              <p>username_2</p>
              <p>username_3</p>
              <p>username_4</p>
            </div>
          </details>
        </div>
        <div className={styles.notes} />
      </div>
      <div className={styles.wall} />
      <div className={styles.discover} />
    </div>
  );
};

export default MainWrapper;
