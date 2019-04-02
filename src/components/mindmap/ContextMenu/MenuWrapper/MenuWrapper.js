import React from "react";
import styles from "./MenuWrapper.module.scss";
import { getAnnularSectorPathAttribute } from "tools/ContextMenu";

const MenuWrapper = ({
  location,
  wrapperSize,
  bgColor,
  innerRadius,
  outerRadius,
  children
}) => (
  <div
    className={styles.wrapper}
    style={{
      width: `${wrapperSize}px`,
      height: `${wrapperSize}px`,
      top: location.y - wrapperSize / 2,
      left: location.x - wrapperSize / 2
    }}
  >
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${wrapperSize} ${wrapperSize}`}
      className="contextMenu"
    >
      <g>
        <g>
          <path
            d={getAnnularSectorPathAttribute({
              centerX: wrapperSize / 2,
              centerY: wrapperSize / 2,
              startDegrees: 0,
              endDegrees: 180,
              innerRadius: innerRadius,
              outerRadius: outerRadius
            })}
            stroke={`${bgColor}`}
            fill={`${bgColor}`}
          />
          <path
            d={getAnnularSectorPathAttribute({
              centerX: wrapperSize / 2,
              centerY: wrapperSize / 2,
              startDegrees: 180,
              endDegrees: 360,
              innerRadius: innerRadius,
              outerRadius: outerRadius
            })}
            stroke={`${bgColor}`}
            fill={`${bgColor}`}
          />
        </g>
        {children}
      </g>
    </svg>
  </div>
);

export default MenuWrapper;
