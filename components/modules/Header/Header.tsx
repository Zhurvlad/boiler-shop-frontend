import React from 'react';

import {HeaderTop} from './HeaderTop';

import styles from '../../../styles/header/index.module.scss'
import {HeaderBottom} from './HeaderBottom';



export const Header = () => {
  return (
    <header className={styles.header}>
      <HeaderTop/>
      <HeaderBottom/>
    </header>
  )
}
