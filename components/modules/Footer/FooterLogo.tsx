import React from 'react';
import Link from 'next/link';
import styles from '../../../styles/footer/index.module.scss'


export const FooterLogo = () => (
  <div className={styles.footer__top__item}>
    <Link href={'/dashboard'} passHref legacyBehavior >
      <a className={styles.footer__top__item__logo}>
        <img src="/img/logoFooter.svg" alt="logo"/>
        <span className={styles.footer__top__item__logo__text}>Детали для газовых котлов</span>
      </a>
    </Link>
  </div>
)
