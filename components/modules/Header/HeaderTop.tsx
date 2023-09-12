import React from 'react';
import Link from 'next/link';

import styles from '../../../styles/header/index.module.scss'
import ProfileDropDown from './ProfileDropDown';
import {CityButton} from '../../elements/CityButton/CityButton';
import {useMediaQuery} from '../../../hooks/useMediaQuery';
import {ModeToggler} from '../../elements/ModeToggler/ModeToggler';
import {useStore} from 'effector-react';
import {$mode} from '../../../context/mode';
import {usePopup} from '../../../hooks/usePopup';


export const HeaderTop = () => {
  const isMedia950 = useMediaQuery(950)
  const {open, setOpen, toggleOpen, closePopup} = usePopup()

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={styles.header__top}>
      <div className={`container ${styles.header__top__container}`}>
        {!isMedia950 && <CityButton/>}
        {isMedia950
        && <button onClick={toggleOpen} className={`${styles.burger_menu} ${open ? styles.open : ''} ${darkModeClass}`}>
          <span></span>
          <span></span>
          <span></span>
        </button>}
        <nav className={`${styles.header__nav} ${open ? styles.open : ''} ${darkModeClass}`}>
          <ul className={styles.header__nav__list}>
            <li className={styles.header__nav__list__item}>
              <Link href={'/shipping-payment'} legacyBehavior>
                <a className={`${styles.header__nav__list__item__link} ${darkModeClass}`} onClick={closePopup}>Доставка и оплата</a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href={'/about'} legacyBehavior>
                <a className={`${styles.header__nav__list__item__link} ${darkModeClass}`} onClick={closePopup}>О компании</a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href={'/catalog'} legacyBehavior>
                <a className={`${styles.header__nav__list__item__link} ${darkModeClass}`} onClick={closePopup}>Каталог</a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href={'/contacts'} legacyBehavior>
                <a className={`${styles.header__nav__list__item__link} ${darkModeClass}`} onClick={closePopup}>Контакты</a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href={'/wholesale-buyers'} legacyBehavior>
                <a className={`${styles.header__nav__list__item__link} ${darkModeClass}`} onClick={closePopup}>Оптовым покупателям</a>
              </Link>
            </li>
            {isMedia950 && <li className={styles.header__nav__list__item}><CityButton/></li>}
            {isMedia950 && <li className={styles.header__nav__list__item}><ModeToggler/></li>}
          </ul>
        </nav>
        <ProfileDropDown/>
      </div>
    </div>
  )
}
