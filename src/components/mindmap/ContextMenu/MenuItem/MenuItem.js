/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import {
  getAnnularSectorPathAttribute,
  getIconPosition,
} from 'tools/ContextMenu';

const MenuItem = ({
  pathAttribute,
  menu,
  options,
  iconSize,
  iconPosition,
  handleMenuClick,
  handleMouseOver,
  handleMouseOut,
  index,
  wrapperSize,
  menuDegrees,
  menuSpaceDegrees,
  innerRadius,
  outerRadius,
}) => (
  <g
    onClick={handleMenuClick}
    onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut}
    data-label={menu.label}
  >
    <path
      d={getAnnularSectorPathAttribute({
        centerX: wrapperSize / 2,
        centerY: wrapperSize / 2,
        startDegrees: menuDegrees * index + menuSpaceDegrees,
        endDegrees: menuDegrees * (index + 1) - menuSpaceDegrees,
        innerRadius,
        outerRadius,
      })}
      stroke={options.bgColor}
      fill={options.bgColor}
    />
    <image
      width={iconSize}
      height={iconSize}
      x={
        getIconPosition(
          menuDegrees * index + menuDegrees / 2,
          innerRadius,
          outerRadius,
          wrapperSize,
          iconSize,
        ).x
      }
      y={
        getIconPosition(
          menuDegrees * index + menuDegrees / 2,
          innerRadius,
          outerRadius,
          wrapperSize,
          iconSize,
        ).y
      }
      href={menu.iconURL}
    />
  </g>
);

export default MenuItem;
