import {useStore} from 'effector-react';
import {$mode} from '../../../context/mode';
import styles from '../../../styles/order/index.module.scss';
import {IShoppingCartItem} from '../../../types/shoppingCart';
import {usePrice} from '../../../types/usePrice';
import Link from 'next/link';
import React from 'react';
import {useMediaQuery} from '../../../hooks/useMediaQuery';
import {CartItemCount} from '../../elements/CartItemCounter/CartItemCounter';
import {formatPrice} from '../../../utils/common';
import spinnerStyles from '../../../styles/spinner/index.module.scss';
import {DeleteSvg} from '../../elements/DeleteSvg/DeleteSvg';


export const OrderItem = ({item}: {item: IShoppingCartItem}) => {

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinnerDarkModeClass = mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`
  const isMedia1160 = useMediaQuery(1160)

  const {price, spinner, increasePrice, decreasePrice, deleteCartItem} = usePrice(item.count, item.partId, item.price)

  return (
    <li className={styles.order__cart__list__item}>
      <div className={styles.order__cart__list__item__left}>
        <div className={styles.order__cart__list__item__left__inner}>
          <div className={styles.order__cart__list__item__img}>
            <img src={item.image} alt={item.name}/>
          </div>
          <Link href={`/catalog/${item.partId}`} passHref legacyBehavior>
            <a className={`${styles.order__cart__list__item__text} ${darkModeClass}`}>
              <span>{item.name.replace('.', '')}, {item.parts_manufacturer}, {item.boiler_manufacturer}</span>
            </a>
          </Link>
        </div>
        {isMedia1160
        && item.in_stocks === 0
          ? <span className={styles.order__cart__list__item__empty}>Нет на складе</span>
          : <CartItemCount decreasePrice={decreasePrice} increasePrice={increasePrice}
                           initialCount={item.count} partId={item.partId} totalCount={item.in_stocks}/>}
      </div>
      <div className={styles.order__cart__list__item__right}>
        {!isMedia1160
        && item.in_stocks === 0
          ? <span className={styles.order__cart__list__item__empty}>Нет на складе</span>
          : <CartItemCount decreasePrice={decreasePrice} increasePrice={increasePrice}
                           initialCount={item.count} partId={item.partId} totalCount={item.in_stocks}/>}
        <span className={`${styles.order__cart__list__item__price} ${darkModeClass}`}>{formatPrice(price)} p</span>
        <button className={styles.order__cart__list__item__delete} onClick={deleteCartItem}>
          {spinner
            ? <span className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
                    style={{left: '-13px', top: '-30px', width: 25, height: 25}}/>
            : 'Удалить'}
        </button>
      </div>
    </li>
  )
}
