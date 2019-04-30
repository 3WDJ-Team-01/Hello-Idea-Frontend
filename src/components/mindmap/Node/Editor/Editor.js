/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import ContentEditable from 'react-contenteditable';
import styles from './Editor.module.scss';

const Editor = ({
  head,
  index,
  location,
  size,
  color,
  handleInput,
  handleTextContent,
  handleResize,
  handleBlur,
  handleKeyPress,
}) => (
  <foreignObject
    x={location.x - size.width / 2}
    y={location.y - size.height / 2}
    width="100%"
    height="100%"
  >
    <div
      className={styles.editor}
      style={{
        width: size.width,
        height: size.height,
        border: `2px solid ${color}`,
        overflowY: 'hidden',
      }}
      onMouseUp={handleResize}
    >
      <ContentEditable
        html={head}
        className={`${styles.input} editable`}
        onChange={handleTextContent}
        onBlur={handleBlur}
        onKeyDown={handleKeyPress}
      />
    </div>
  </foreignObject>
);
export default Editor;
