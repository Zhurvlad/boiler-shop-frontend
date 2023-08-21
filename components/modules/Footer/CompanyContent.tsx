import React from 'react';
import Link from 'next/link';

import styles from '../../../styles/footer/index.module.scss'

const CompanyContentData = [
  {href: '/about', title: 'О компании'},
  {href: '/contacts', title: 'Обратная связь'},
  {href: '/wholesale-buyers', title: 'Оптовым покупателям'},
  {href: '/contacts', title: 'Контакты'}
]

export const CompanyContent = () => (
  <ul className={styles.footer__top__item__list}>
    {CompanyContentData.map((i, _) => (
      <li key={i.title} className={styles.footer__top__item__list__item}>
        <Link href={i.href} legacyBehavior passHref>
          <a className={styles.footer__top__item__list__item__link}>{i.title}</a>
        </Link>
      </li>
    ))}
  </ul>
)
