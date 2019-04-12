import React from 'react';

const Path = ({ mode, index, space, color, endPosition, startAt, endAt }) => {
  const endLocation = { x: endAt.x, y: endAt.y };

  if (endPosition === 'right') {
    endLocation.x += endAt.width / 2 + space;
  } else if (endPosition === 'bottom') {
    endLocation.y += endAt.height / 2 + space;
  } else if (endPosition === 'left') {
    endLocation.x -= endAt.width / 2 + space;
  } else if (endPosition === 'top') {
    endLocation.y -= endAt.height / 2 + space;
  }

  return (
    <g>
      <defs>
        <marker
          id={index}
          viewBox="0 0 10 10"
          refX="0.3"
          refY="5"
          markerUnits="strokeWidth"
          markerWidth="1"
          markerHeight="1"
          orient="auto"
          stroke=""
          strokeOpacity="0.75"
          fill={color}
          fillOpacity="0.75"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
      <path
        stroke={color}
        strokeOpacity="0.75"
        strokeWidth="7"
        fill="none"
        markerEnd={`url(#${index})`}
        d={
          mode === 'vertical'
            ? `
          M ${startAt.x}, ${startAt.y}
          C ${startAt.x}, ${(startAt.y + endLocation.y) / 2} 
          ${endLocation.x}, ${(startAt.y + endLocation.y) / 2}
          ${endLocation.x}, ${endLocation.y}
        `
            : `
          M ${startAt.x}, ${startAt.y}
          C ${(startAt.x + endLocation.x) / 2}, ${startAt.y}
          ${(startAt.x + endLocation.x) / 2}, ${endLocation.y}
          ${endLocation.x}, ${endLocation.y}
        `
        }
      />
    </g>
  );
};

export default Path;
