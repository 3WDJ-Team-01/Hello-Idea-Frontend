/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { MDBBtn } from 'mdbreact';
import styles from './Footer.module.scss';

const Footer = ({ type, zoom, handleCanvasZoom }) => {
  return (
    <div className={styles.brainFooterWrapper}>
      <div className={styles.brainStatus}>
        <div className={styles.slider}>
          <input
            type="range"
            className="custom-range"
            id="customRange1"
            min={0.5}
            max={2.0}
            step={0.1}
            onChange={handleCanvasZoom}
            value={zoom}
          />
        </div>
      </div>
      <div className={styles.brainFooter}>
        {type === 'group' ? (
          <>
            <div className={styles.brainLeftFooter}>
              <MDBBtn color="deep-orange">Group Chat</MDBBtn>
            </div>
            <div className={styles.brainRightFooter}>
              <div>Username</div>
              <div>Username</div>
              <div>Username</div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Footer;
