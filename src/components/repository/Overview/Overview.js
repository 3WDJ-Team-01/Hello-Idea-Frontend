/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link, Route } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import styles from './Overview.module.scss';

const Similar = ({ title }) => (
  <div className={styles.sketchBox}>
    <div className={styles.sketchImg}>이미지</div>
    <div className={styles.sketchHov}>
      <Link to="/" className={styles.hovlink}>
        capstone_Idea
      </Link>
    </div>
  </div>
);

const Overview = ({ repository }) => {
  return (
    <>
      <div className={styles.sketchScreen}>screen</div>
      <div className={styles.sketchAll}>
        <MDBBtn color="primary">nnn Likes</MDBBtn>
        <div className={styles.sketchInfor}>
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley
        </div>

        <div className={styles.sketchUnder}>
          <div className="myPageRepoField">* IT 72% *nn nn% *nn nn%</div>
        </div>
      </div>
      <div className={styles.similarSketch}>
        <h6>Similar Sketch</h6>
        <div className={styles.sketchList}>
          <Similar title="capston" />
          <Similar title="test" />
          <Similar title="test2" />
        </div>
      </div>
    </>
  );
};

export default Overview;
