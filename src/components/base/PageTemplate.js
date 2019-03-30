import React from 'react';
import HeaderContainer from 'containers/HeaderContainer';

const MainStructure = ({ children, isHidden = false }) => (
  <>
    <HeaderContainer isHidden={isHidden} />
    {children}
  </>
);

export default MainStructure;
