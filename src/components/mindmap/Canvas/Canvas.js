/* eslint-disable no-else-return */
import React from 'react';

const Canvas = ({
  originSize,
  changedSize,
  pins,
  style,
  onPointerDown,
  onPointerUp,
  onPointerMove,
  onWheel,
  onDrop,
  children,
  zoom,
}) => {
  const { width, height } = originSize;
  // If browser supports pointer events
  if (window.PointerEvent) {
    return (
      <div
        id="canvasFrame"
        style={{
          width,
          height,
          overflow: 'visible',
          touchAction: 'none',
        }}
        onDragOver={e => {
          e.preventDefault();
        }}
        onDrop={onDrop}
      >
        <svg
          id="canvas"
          className="canvas"
          viewBox={`
          ${pins.leftTop.x} ${pins.leftTop.y}
          ${width / zoom} ${height / zoom}
          `}
          width={width}
          height={height}
          style={style}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          // onPointerLeave={onPointerUp}
          onPointerMove={onPointerMove}
          onWheel={onWheel}
        >
          <defs>
            <Filter />
          </defs>
          {children}
        </svg>
      </div>
    );
  } else {
    return (
      <div id="canvasFrame" style={{ width, height, overflow: 'visible' }}>
        <svg
          id="canvas"
          viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
          width={width}
          height={height}
          style={style}
          onMouseDown={onPointerDown}
          onMouseUp={onPointerUp}
          // onMouseLeave={onPointerUp}
          onMouseMove={onPointerMove}
          onTouchStart={onPointerDown}
          onTouchEnd={onPointerUp}
          onTouchMove={onPointerMove}
          onWheel={onWheel}
        >
          <defs>
            <Filter />
          </defs>
          {children}
        </svg>
      </div>
    );
  }
};

const Filter = () => (
  <defs>
    <filter id="shadow-2dp" x="-50%" y="-100%" width="200%" height="300%">
      <feOffset in="SourceAlpha" result="offA" dy="2" />
      <feOffset in="SourceAlpha" result="offB" dy="1" />
      <feOffset in="SourceAlpha" result="offC" dy="3" />
      <feMorphology in="offC" result="spreadC" operator="erode" radius="2" />
      <feGaussianBlur in="offA" result="blurA" stdDeviation="1" />
      <feGaussianBlur in="offB" result="blurB" stdDeviation="2.5" />
      <feGaussianBlur in="spreadC" result="blurC" stdDeviation="0.5" />
      <feFlood floodOpacity="0.14" result="opA" />
      <feFlood floodOpacity="0.12" result="opB" />
      <feFlood floodOpacity="0.20" result="opC" />
      <feComposite in="opA" in2="blurA" result="shA" operator="in" />
      <feComposite in="opB" in2="blurB" result="shB" operator="in" />
      <feComposite in="opC" in2="blurC" result="shC" operator="in" />
      <feMerge>
        <feMergeNode in="shA" />
        <feMergeNode in="shB" />
        <feMergeNode in="shC" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

export default Canvas;
