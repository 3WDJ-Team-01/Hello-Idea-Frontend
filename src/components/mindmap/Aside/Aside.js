/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link, Route } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import styles from './Aside.module.scss';

const Aside = ({ repository }) => {
  return (
    <div className={styles.bodyRight}>
      <div className={styles.recommendBoxList}>
        <div className={styles.recommendBox}>
          <div className="recommendIdea">
            <h5>캡스톤</h5>
          </div>
          <div className="recommendHash">#ㅇㅇㅇ #ㄹㄹㄹ </div>
        </div>

        <div className={styles.recommendBox}>
          <div className="recommendIdea">
            <h5>캡스톤</h5>
          </div>
          <div className="recommendHash">#ㅇㅇㅇ #ㄹㄹㄹ </div>
        </div>

        <div className={styles.recommendBox}>
          <div className="recommendIdea">
            <h5>캡스톤</h5>
          </div>
          <div className="recommendHash">#ㅇㅇㅇ #ㄹㄹㄹ </div>
        </div>

        <div className={styles.recommendBox}>
          <div className="recommendIdea">
            <h5>캡스톤</h5>
          </div>
          <div className="recommendHash">#ㅇㅇㅇ #ㄹㄹㄹ </div>
        </div>
      </div>
    </div>
  );
};

export default Aside;
