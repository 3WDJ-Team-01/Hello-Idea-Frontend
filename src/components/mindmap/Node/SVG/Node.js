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
  hasFeedback,
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          x={location.x + size.width / 2 - 12}
          y={
            hasFeedback
              ? location.y - size.height / 2 + 12
              : location.y - size.height / 2 - 12
          }
        >
          <path
            d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"
            fill="#4285F4"
          />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      ) : null}
      {hasFeedback ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          x={location.x + size.width / 2 - 12}
          y={location.y - size.height / 2 - 12}
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"
            fill="red"
          />
        </svg>
      ) : null}
    </g>
  );
};

export default Node;
