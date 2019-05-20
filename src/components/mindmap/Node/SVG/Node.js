import React from 'react';
import styles from './Node.module.scss';

const Node = ({
  head,
  index,
  location,
  size,
  color,
  pointer,
  isForked,
  hasFile,
}) => {
  return (
    <g>
      <rect
        x={location.x - size.width / 2}
        y={location.y - size.height / 2}
        rx={index > 0 ? '10' : 0}
        ry={index > 0 ? '10' : 0}
        width={size.width}
        height={size.height}
        filter={pointer.state.isDrag ? '' : 'url(#shadow-2dp)'}
        style={
          isForked > 0
            ? { fill: 'white', stroke: color, strokeWidth: 3 }
            : { fill: color, stroke: color, strokeWidth: 2 }
        }
      />
      <foreignObject
        x={location.x - size.width / 2}
        y={location.y - size.height / 2}
        width={size.width}
        height={size.height}
      >
        <div
          className={styles.wrapper}
          style={{
            width: size.width,
            height: size.height,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <p
            className={styles.head}
            style={{
              width: '100%',
              margin: 0,
              fontSize: '16px',
              padding: '0.5em',
              textAlign: 'center',
              wordBreak: 'keep-all',
              wordWrap: 'break-word',
            }}
          >
            {head}
          </p>
        </div>
      </foreignObject>

      <rect
        id={index}
        className={isForked > 0 ? 'forked' : 'node'}
        x={location.x - size.width / 2}
        y={location.y - size.height / 2}
        rx={index > 0 ? '10' : 0}
        ry={index > 0 ? '10' : 0}
        width={size.width}
        height={size.height}
        filter={pointer.state.isDrag ? '' : 'url(#shadow-2dp)'}
        style={{ fill: 'transparent', stroke: 'transparent', strokeWidth: 2 }}
      />
      {hasFile ? (
        <circle
          cx={location.x + size.width / 2}
          cy={location.y - size.height / 2}
          r="8"
          stroke="#4285F4"
          fill="#4285F4"
        />
      ) : null}
    </g>
  );
};

export default Node;
