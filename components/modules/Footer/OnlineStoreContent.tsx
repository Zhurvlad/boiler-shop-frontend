
import styles from '../../../styles/footer/index.module.scss'
import Link from 'next/link';

export const OnlineStoreContent = () => (
  <ul className={styles.footer__top__item__list}>
    <li className={styles.footer__top__item__list_item}>
      <Link href={'/catalog'} legacyBehavior passHref>
        <a className={styles.footer__top__item__list__item__link}>Каталог</a>
      </Link>
    </li>
    <li className={styles.footer__top__item__list_item}>
      <Link href={'/shipping-payment'} legacyBehavior passHref>
        <a className={styles.footer__top__item__list__item__link}>Доставка и оплата</a>
      </Link>
    </li>
  </ul>
)
