/* eslint-disable no-nested-ternary */
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
  ) : path ? (
    <Link to={`${path}`}>
      <div
        onClick={disabled && onClick}
        className={disabled ? styles.head : styles.item}
      >
        {children}
      </div>
    </Link>
  ) : (
    <div
      onClick={disabled && onClick}
      className={disabled ? styles.head : styles.item}
    >
      {children}
    </div>
  );

export const DropdownMenuList = ({ children }) => (
  <div className={styles.wrapper}>
    <div className={styles.menu}>{children}</div>
  </div>
);

export const DropdownTrigger = ({ caret, message, children }) => (
  <summary>
    {children}
    {caret && <span className={styles.carrot} />}
    {message && <span className={styles.message} />}
    {!caret && !message && <span className={styles.toggle} />}
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
