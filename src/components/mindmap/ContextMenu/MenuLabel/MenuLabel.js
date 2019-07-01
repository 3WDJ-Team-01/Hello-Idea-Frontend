import React from 'react';
import styles from './MenuLabel.module.scss';

const MenuLabel = ({ wrapperSize, location, label, options }) => {
  return (
    <div
      className={styles.label}
      style={{
        width: `${wrapperSize}px`,
        top: location.y + wrapperSize / 2,
        left: location.x - wrapperSize / 2,
        color: options.bgColor,
      }}
    >
      {label}
    </div>
  );
};

export default MenuLabel;
