/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import HeaderContainer from 'containers/HeaderContainer';
import styles from './PageTemplate.module.scss';

class PageTemplate extends Component {
  handleDropdown = e => {
    const dropdown = document.querySelectorAll('details');
    dropdown.forEach(dom => {
      dom.open = false;
    });
  };

  render() {
    const { children, isHidden = false } = this.props;
    const { handleDropdown } = this;
    return (
      <div className={styles.App} onClick={handleDropdown}>
        <HeaderContainer isHidden={isHidden} />
        {children}
      </div>
    );
  }
}

export default PageTemplate;
