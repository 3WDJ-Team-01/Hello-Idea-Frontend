import React from 'react';
import HeaderContainer from '../../containers/HeaderContainer';

const MainStructure = ({ children, isHidden = false }) => (
  <React.Fragment>
    {isHidden ? null : <HeaderContainer />}
    {children}
  </React.Fragment>
);

export default MainStructure;
