import React from 'react';
import { Link, Route } from 'react-router-dom';
import styles from './Overview.module.scss';

const Overview = ({
  user,
  url,
  Repositories,
  Followers,
  Followings,
  children,
}) => {
  return (
    <>
      <div className={styles.section}>
        <span>statistics</span>
        <div className={styles.myPageGraph}>
          <div className={styles.graph}>graph1</div>
          <div className={styles.graph}>graph2</div>
        </div>
      </div>
      <div className={styles.section}>
        <span>recently activity</span>
        <div className={styles.activity}>
          February 2019
          <div className={styles.activityDate}>
            <div className={styles.verticlLine} />
            <div className={styles.activiryList}>
              <div className={styles.activityGroup}>
                <div className={styles.activityCreated}>
                  Created 10 ideas in 2 Repositories
                </div>
                <div className={styles.activities}>
                  <Link to="/">USERNAME/capstone</Link> 8ideas <br />
                  <Link to="/">1st GROUPUSER/free_topics</Link> 2ideas
                </div>
              </div>
              <div className={styles.activityGroup}>
                <div className={styles.activityCreated}>
                  Created 1 repositories
                </div>
                <div className={styles.activities}>
                  <Link to="/">USERNAME/capstone</Link>
                </div>
              </div>
              <div className={styles.activityGroup}>
                <div className={styles.activityCreated}>
                  Created 2 ideas in 1 repositories
                </div>
                <div className={styles.activities}>
                  <Link to="/">1st GROUPUSER/free_topics</Link> 2ideas
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
