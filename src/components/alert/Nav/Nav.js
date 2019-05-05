/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import styles from './Nav.module.scss';

const Nav = ({ type, typeList, handleType }) => {
  return (
    <div className={styles.repoCategory}>
      <ul>
        {typeList.map((label, i) => (
          <li
            key={i}
            name={label}
            style={
              type === label
                ? {
                    borderLeft: '3px solid #4285f4',
                    fontWeight: 500,
                  }
                : {}
            }
            onClick={handleType}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
