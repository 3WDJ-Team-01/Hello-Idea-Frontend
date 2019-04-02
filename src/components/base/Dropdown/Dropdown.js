/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dropdown.module.scss';

export const DropdownMenu = ({ isDivider, path, onClick, children }) =>
  isDivider ? (
    <hr />
  ) : (
    <Link to={`${path}`}>
      <div onClick={onClick} className={styles.item}>
        {children}
      </div>
    </Link>
  );

export const DropdownMenuList = ({ children }) => (
  <div className={styles.wrapper}>
    <div className={styles.menu}>{children}</div>
  </div>
);

export const DropdownTrigger = ({ children }) => <summary>{children}</summary>;

export const DropdownWrapper = ({ children }) => (
  <details className={styles.dropdown}>{children}</details>
);
