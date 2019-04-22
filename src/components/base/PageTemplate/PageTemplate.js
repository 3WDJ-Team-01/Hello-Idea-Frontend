/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import HeaderContainer from 'containers/HeaderContainer';
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
    const {
      history,
      children,
      isHidden = false,
      bgColor = 'white',
    } = this.props;
    const { handleDropdown } = this;
    return (
      <div
        className={styles.App}
        style={{ backgroundColor: bgColor }}
        onClick={handleDropdown}
      >
        <HeaderContainer isHidden={isHidden} history={history} />
        {children}
      </div>
    );
  }
}

export default PageTemplate;
