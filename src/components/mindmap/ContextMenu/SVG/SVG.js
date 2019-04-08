import React from 'react';
import { getAnnularSectorPathAttribute } from 'tools/ContextMenu';

const SVG = ({
  location,
  wrapperSize,
  bgColor,
  innerRadius,
  outerRadius,
  children,
}) => {
  return (
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
              innerRadius,
              outerRadius,
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
              innerRadius,
              outerRadius,
            })}
            stroke={`${bgColor}`}
            fill={`${bgColor}`}
          />
        </g>
        {children}
      </g>
    </svg>
  );
};

export default SVG;
