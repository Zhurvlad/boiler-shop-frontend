import React, {forwardRef} from 'react';
import {useStore} from 'effector-react';
import {AnimatePresence, motion} from 'framer-motion'

import {withClickOutside} from '../../../../utils/withClickOutside';
import {ShoppingCartSvg} from '../../../elements/ShoppingCartSvg/ShoppingCartSvg';
import {IWrappedComponentProps} from '../../../../types/common';
import {$mode} from '../../../../context/mode';
import {$shoppingCart, setShoppingCart} from '../../../../context/shopping-cart'

import styles from '../../../../styles/cartPopup/index.module.scss'
import Link from 'next/link';
import {CartPopupItem} from './CartPopupItem';
import {$user} from '../../../../context/user';
import {getCartItemsFx} from '../../../../app/api/shopping-cart';
import {toast} from 'react-toastify';


const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(({opened, setOpened}, ref) => {

  const mode = useStore($mode)
  const user = useStore($user)
  const shoppingCart = useStore($shoppingCart)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const toggleCartDropDown = () => setOpened(!opened)

  React.useEffect(() => {
    loadCartItems()
  }, [])

  const loadCartItems = async () => {
    try {
      const cartItem = await getCartItemsFx(`/shopping-cart/${user.userId}`)

      setShoppingCart(cartItem)
    } catch (e) {
      toast.warning(e.message)
    }
  }



  return (
    <div className={styles.cart} ref={ref}>
      <button className={`${styles.cart__btn} ${darkModeClass}`} onClick={toggleCartDropDown}>

        {!!shoppingCart.length &&
        <span className={styles.cart__btn__count}>{shoppingCart.length}</span>
        }
        <span className={styles.cart__svg}>
          <ShoppingCartSvg/>
        </span>
        <span className={styles.cart__text}>
        Корзина
      </span>
      </button>
      <AnimatePresence>
        {opened &&
        <motion.ul
          initial={{opacity: 0, scale: 0}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0}}
          className={`${styles.cart__popup} ${darkModeClass}`}
          style={{transformOrigin: 'right top'}}
        >
          <h3 className={styles.cart__popup__title}>Корзина</h3>
          <ul className={styles.cart__popup__list}>
            {shoppingCart.length
              ? shoppingCart.map((item) => <CartPopupItem  item={item} key={item.id}/>)
              : <li className={styles.cart__popup__empty}>
                  <span className={`${styles.cart__popup__empty__text} ${darkModeClass}`}>Корзина пуста</span>
                </li>
            }
          </ul>
          <div className={styles.cart__popup__footer}>
            <div className={styles.cart__popup__footer__total}>
              <span className={`${styles.cart__popup__footer__text} ${darkModeClass}`}>Общая сумма заказа</span>
              <span className={styles.cart__popup__footer__price}>0</span>
            </div>
            <Link href={'/order'} passHref legacyBehavior>
              <button className={styles.cart__popup__footer__btn} disabled={!shoppingCart.length}>
                Оформить заказ
              </button>
            </Link>
          </div>
        </motion.ul>}
      </AnimatePresence>
    </div>
  )
})

export default withClickOutside(CartPopup)
