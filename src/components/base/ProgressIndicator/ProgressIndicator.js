/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import styles from './ProgressIndicator.module.scss';

const ProgressIndicator = ({ mini }) => (
  <div
    className={styles.wrapper}
    style={
      mini
        ? {
            backgroundColor: 'transparent',
            position: 'relative',
            paddingBottom: 0,
          }
        : {}
    }
  >
    <svg
      className={styles.spinner}
      width="65px"
      height="65px"
      viewBox="0 0 66 66"
    >
      <circle
        className={styles.circle}
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="30"
      />
    </svg>
  </div>
);

export default ProgressIndicator;
