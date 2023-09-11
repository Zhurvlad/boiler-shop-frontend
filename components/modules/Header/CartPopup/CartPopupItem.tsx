import {useStore} from 'effector-react';
import {$mode} from '../../../../context/mode';
import styles from '../../../../styles/cartPopup/index.module.scss';
import {IShoppingCartItem} from '../../../../types/shoppingCart';
import Link from 'next/link';
import {DeleteSvg} from '../../../elements/DeleteSvg/DeleteSvg';
import React, {useState} from 'react';
import spinnerStyles from '../../../../styles/spinner/index.module.scss'
import {formatPrice} from '../../../../utils/common';
import {removeItemFromCart, updateTotalPrice} from '../../../../utils/shopping-cart';

import {CartItemCount} from '../../../elements/CartItemCounter/CartItemCounter';
import {usePrice} from '../../../../types/usePrice';


export const CartPopupItem = ({item}: { item: IShoppingCartItem }) => {

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinnerDarkModeClass = mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`
/*  const [spinner, setSpinner] = React.useState(false)

  const [price, setPrice] = useState(item.price)*/

  const {price, spinner, increasePrice, decreasePrice, deleteCartItem} = usePrice(item.count, item.partId, item.price)

 /* React.useEffect(() => {
    setPrice(price * item.count)
  }, [])

  React.useEffect(() => {
    updateTotalPrice(price, item.partId)
  },[price])

  const increasePrice = () => setPrice(price + item.price)
  const decreasePrice = () => setPrice(price - item.price)

  const deleteCartItem = () => removeItemFromCart(item.partId, setSpinner)
*/
  return (
    <li className={styles.cart__popup__list__item}>
      <div className={styles.cart__popup__list__item__top}>
        <div className={styles.cart__popup__list__item__img}>
          <img src={item.image} alt={item.name}/>
        </div>
        <Link href={`/catalog/${item.partId}`} passHref legacyBehavior>
          <a className={`${styles.cart__popup__list__item__text} ${darkModeClass}`}>
            <span>{item.name.replace('.', '')}, {item.parts_manufacturer}, {item.boiler_manufacturer}</span>
          </a>
        </Link>
        <button onClick={deleteCartItem}>
          <span>
            {spinner ? <span className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
                             style={{left: 0, top: 0, width: 20, height: 20}}/> : <DeleteSvg/>}
          </span>
        </button>
      </div>
      <div className={styles.cart__popup__list__item__bottom}>
        {item.in_stocks === 0
          ? <span className={styles.cart__popup__list__item__empty}>Нет на складе</span>
          : <CartItemCount decreasePrice={decreasePrice} increasePrice={increasePrice}
                           initialCount={item.count} partId={item.partId} totalCount={item.in_stocks}/>}
          <span className={`${styles.cart__popup__list__item__price} ${darkModeClass}`}>{formatPrice(price)} p</span>

      </div>
    </li>
  )
}
