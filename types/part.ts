import React, {ReactNode} from 'react';


export interface IPartImagesItemProps {
  src: string,
  callback: (i: string) => void,
  alt: string
}


export interface IPartAccordionProps {
  children: React.ReactNode,
  title: string
}
