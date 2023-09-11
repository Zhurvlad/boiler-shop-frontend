import styles from '../../../styles/order/index.module.scss'
import {useStore} from 'effector-react';
import {$mode} from '../../../context/mode';
import {$shoppingCart, $totalPrice} from '../../../context/shopping-cart';
import {formatPrice} from '../../../utils/common';
import {OrderAccordion} from '../../modules/OrderPage/OrderAccordion';
import React from 'react';

export const OrderPage = () => {

  const mode = useStore($mode)
  const shoppingCart = useStore($shoppingCart)
  const totalPrice = useStore($totalPrice)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const totalCount = shoppingCart.reduce((sum, obj) => sum + obj.count, 0)
  const [orderIsReady, setOrderIsReady] = React.useState(false)
  const [agreement, setAgreement] = React.useState(false)

  const toggleAgreement = () => setAgreement(!agreement)

  return (
    <section className={styles.order}>
      <div className={'container'}>
        <h2 className={`${styles.order__title} ${darkModeClass}`}>
          Оформление заказа
        </h2>
        <div className={styles.order__inner}>
          <div className={styles.order__cart}>
            <OrderAccordion setOrderIsReady={setOrderIsReady} showdownIcon={orderIsReady}/>
          </div>
        </div>
        <div className={styles.order__pay}>
          <h3 className={`${styles.order__pay__title} ${darkModeClass}`}>Итого</h3>
          <div className={`${styles.order__pay__inner} ${darkModeClass}`}>
            <div className={styles.order__pay__goods}>
              <span>Товары ({totalCount})</span>
              <span>{formatPrice(totalPrice)} P</span>
            </div>
            <div className={styles.order__pay__total}>
              <span>Итого {totalPrice}</span>
              <span className={darkModeClass}>{formatPrice(totalPrice)} P</span>
            </div>
            <button className={styles.order__pay__btn} disabled={!(orderIsReady && agreement)}>
              Подтвердить заказ
            </button>
            <label className={`${styles.order__pay__rights} ${darkModeClass}`}>
              <input className={styles.order__pay__rights__input} type="checkbox"
                     onChange={toggleAgreement} checked={agreement}/>
              <span className={styles.order__pay__rights__text}>
                <strong>Согласен с условиями </strong>
                 Правил пользования торговой площадкой и правилами возврата
              </span>
            </label>
          </div>
        </div>
      </div>
    </section>
  )
}
