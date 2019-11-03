import React from 'react';
// import NavBarContainer from '../containers/NavBarContainer';
import ModalContainer from './ModalContainer';
import NavBarContainer from './NavBarContainer';

export default function ModalApp ({ children }) {
  return (
    <div id="main">main hoon khalnayak
      {
          <NavBarContainer />
      }
      {children}
      <ModalContainer />
    </div>
  );
}