/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dropdown.module.scss';

export const DropdownMenu = ({
  isDivider,
  disabled,
  path,
  onClick,
  children,
}) =>
  isDivider ? (
    <hr />
  ) : (
    <Link to={`${path}`}>
      <div
        onClick={disabled && onClick}
        className={disabled ? styles.head : styles.item}
      >
        {children}
      </div>
    </Link>
  );

export const DropdownMenuList = ({
  children,
  posRight = '80%',
  minWidth = '140px',
}) => (
  <div className={styles.wrapper}>
    <div className={styles.menu} style={{ right: posRight, minWidth }}>
      {children}
    </div>
  </div>
);

export const DropdownTrigger = ({ caret, children }) => (
  <summary>
    {children}
    {caret && <span className={styles.carrot} />}
  </summary>
);

export const DropdownWrapper = ({ children }) => (
  <details
    className={styles.dropdown}
    onClick={e => {
      if (e.currentTarget.open) {
        e.preventDefault();
        e.currentTarget.open = false;
      }
    }}
  >
    {children}
  </details>
);
