import React from "react";

const MenuItem = ({
  pathAttribute,
  menu,
  options,
  iconSize,
  iconPosition,
  handleMenuClick,
  handleMouseOver,
  handleMouseOut
}) => (
  <g
    onClick={handleMenuClick}
    onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut}
    data-label={menu.label}
  >
    <path d={pathAttribute} stroke={options.bgColor} fill={options.bgColor} />
    <image
      width={iconSize}
      height={iconSize}
      x={iconPosition.x}
      y={iconPosition.y}
      href={menu.iconURL}
    />
  </g>
);

export default MenuItem;
