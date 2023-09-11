import React from 'react';
import Link from 'next/link';
import {useStore} from 'effector-react';

import {$mode} from '../../../context/mode';
import {IBoilerPart} from '../../../types/boilerParts';
import {$shoppingCart} from '../../../context/shopping-cart';
import {formatPrice} from '../../../utils/common';
import {CartHoverCheckedSvg} from '../../elements/CartHoverCheckedSvg/CartHoverCheckedSvg';
import {CartHoverSvg} from '../../elements/CartHover/CartHover';

import styles from '../../../styles/catalog/index.module.scss';
import spinnerStyles from '../../../styles/spinner/index.module.scss'
import {toggleCartItem} from '../../../utils/shopping-cart';
import {$user} from '../../../context/user';
import {removeFromCartFx} from '../../../app/api/shopping-cart';


export const CatalogItem = ({item}: { item: IBoilerPart }) => {

  const shoppingCart = useStore($shoppingCart)
  const user = useStore($user)

  const spinner = useStore(removeFromCartFx.pending)
  const isInCart = shoppingCart.some((i) => i.partId === item.id)

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const toggleToCart = () => toggleCartItem(user.username,  item.id, isInCart)

  return (
    <li className={`${styles.catalog__list__item} ${darkModeClass}`}>
      <img src={JSON.parse(item.images)[0]} alt={item.name}/>
      <div className={styles.catalog__list__item__inner}>
        <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
          <h3 className={styles.catalog__list__item__code}>{item.name}</h3>
        </Link>
        <span className={styles.catalog__list__item__code}>
          Артикул : {item.vendor_code}
        </span>
        <span className={styles.catalog__list__item__price}>
          {formatPrice(item.price)} ₽
        </span>
      </div>
      <button onClick={toggleToCart} disabled={spinner} className={`${styles.catalog__list__item__cart} ${isInCart ? styles.added : ''}`}>
        {spinner
          ? <div className={spinnerStyles.spinner} style={{top: 6, left: 6}}/>
          : <span>{isInCart
            ? <CartHoverCheckedSvg/>
            : <CartHoverSvg/>}
          </span>}
      </button>
    </li>
  )
}
