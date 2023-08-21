import React from 'react';


export interface IWrappedComponentProps {
    opened: boolean,
    setOpened: (arg: boolean) => void
}

export interface IAccordion {
  children: React.ReactNode,
  title?: string,
  titleClass: string,
  arrowOpenClass: string
}


export interface ILayoutProps {
  children: React.ReactNode
}
