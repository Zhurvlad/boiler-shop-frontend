import React from 'react';
import {MultiValue, SingleValue} from 'react-select';


export interface IWrappedComponentProps {
    opened: boolean,
    setOpened: (arg: boolean) => void
}

export interface IAccordion {
  children: React.ReactNode,
  title?: string,
  titleClass: string,
  arrowOpenClass?: string,
  isMobileForFilters?: boolean,
  hideArrowClass?:string
}


export interface ILayoutProps {
  children: React.ReactNode
}


export interface IOption {
  value: string | number,
  label: string | number
}


export type SelectOptionType = MultiValue<IOption> | SingleValue<IOption> | null
