/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MobileMenubar.module.scss';

export const MobileMenu = ({ isDivider, disabled, path, onClick, children }) =>
  isDivider ? (
    <hr />
  ) : path ? (
    <Link to={`${path}`}>
      <div
        onClick={
          disabled
            ? e => {
                e.preventDefault();
              }
            : () => {}
        }
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

export const MobileMenuList = ({
  children,
  posRight = '100%',
  minWidth = '768px',
}) => (
  <div className={styles.wrapper}>
    <div className={styles.menu} style={{ right: posRight, minWidth }}>
      {children}
    </div>
  </div>
);

export const MobileTrigger = ({ children }) => <summary>{children}</summary>;

export const MobileWrapper = ({ children }) => (
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
