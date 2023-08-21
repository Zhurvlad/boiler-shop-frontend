import React from 'react';

import {Header} from '../modules/Header/Header';
import {ILayoutProps} from '../../types/common';
import {Footer} from '../modules/Footer/Footer';


export const Layout = ({children}: ILayoutProps) => {
  return (
    <>
      <Header/>
      {children}
      <Footer/>
    </>
  )
}
