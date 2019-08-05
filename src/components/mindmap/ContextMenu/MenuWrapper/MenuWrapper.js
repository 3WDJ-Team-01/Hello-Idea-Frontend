import React from 'react';
import styles from './MenuWrapper.module.scss';

const MenuWrapper = ({ location, wrapperSize, children }) => (
  <div
    className={styles.wrapper}
    style={{
      width: `${wrapperSize}px`,
      height: `${wrapperSize}px`,
      top: location.y - wrapperSize / 2,
      left: location.x - wrapperSize / 2,
    }}
  >
    {children}
  </div>
);

export default MenuWrapper;
