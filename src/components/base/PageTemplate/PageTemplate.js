/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import styles from './PageTemplate.module.scss';

class PageTemplate extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleDropdown = e => {
    const dropdown = document.querySelectorAll('details');
    dropdown.forEach(dom => {
      dom.open = false;
    });
  };

  render() {
    const { children, bgColor = 'white' } = this.props;
    const { handleDropdown } = this;
    return (
      <div
        className={styles.App}
        style={{ backgroundColor: bgColor }}
        onClick={handleDropdown}
      >
        {children}
      </div>
    );
  }
}

export default PageTemplate;
