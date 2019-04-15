/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import styles from './Editor.module.scss';

const Editor = React.forwardRef(
  (
    {
      head,
      index,
      location,
      size,
      color,
      handleInput,
      handleTextContent,
      handleBlur,
      handleKeyPress,
    },
    ref,
  ) => (
    <foreignObject
      x={location.x - size.width / 2}
      y={location.y - size.height / 2}
      width={size.width + 6}
      height={size.height + 6}
    >
      <div
        className={styles.editor}
        style={{
          minWidth: size.width,
          minHeight: size.height,
          border: `2px solid ${color}`,
        }}
      >
        <div
          ref={ref}
          className={styles.input}
          contentEditable
          suppressContentEditableWarning
          onInput={handleTextContent}
          onBlur={handleBlur}
          onKeyDown={handleKeyPress}
        />
      </div>
    </foreignObject>
  ),
);
export default Editor;
