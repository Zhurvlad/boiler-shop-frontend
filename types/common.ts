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
  hideArrowClass?:string,
  boxShadowStyles?: string,
  callback: (i: boolean) => void
}


export interface ILayoutProps {
  children: React.ReactNode
}


export interface IOption {
  value: string | number,
  label: string | number
}


export type SelectOptionType = MultiValue<IOption> | SingleValue<IOption> | null


export interface IGeolocation {
  latitude: number,
  longitude: number
}

export interface ICrumbProps {
  text: string,
  textGenerator: () => string,
  href: string,
  last: boolean
}
