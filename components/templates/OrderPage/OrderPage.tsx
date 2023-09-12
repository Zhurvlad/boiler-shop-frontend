import {useStore} from 'effector-react';
import {$mode} from '../../../context/mode';
import {$shoppingCart, $totalPrice, setShoppingCart} from '../../../context/shopping-cart';
import {formatPrice} from '../../../utils/common';
import {OrderAccordion} from '../../modules/OrderPage/OrderAccordion';
import React from 'react';
import {checkPaymentFx, makePaymentFx} from '../../../app/api/payment';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import {$user} from '../../../context/user';
import {removeFromCartFx} from '../../../app/api/shopping-cart';
import styles from '../../../styles/order/index.module.scss'
import spinnerStyles from '../../../styles/spinner/index.module.scss'

export const OrderPage = () => {

  const mode = useStore($mode)
  const user = useStore($user)
  const shoppingCart = useStore($shoppingCart)
  const totalPrice = useStore($totalPrice)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const totalCount = shoppingCart.reduce((sum, obj) => sum + obj.count, 0)
  const [orderIsReady, setOrderIsReady] = React.useState(false)
  const [agreement, setAgreement] = React.useState(false)
  const spinner = useStore(makePaymentFx.pending)
  const router = useRouter()

  const toggleAgreement = () => setAgreement(!agreement)

  React.useEffect(() => {
    const paymentId = sessionStorage.getItem('paymentId')

    if (paymentId) {
      checkPayment(paymentId)
    }

  }, [])

  const makePay = async () => {
    try {
      const data = await makePaymentFx({
        url: '/payment',
        amount: totalPrice
      })

      sessionStorage.setItem('paymentId', data.id)
      await router.push(data.confirmation.confirmation_url)

    } catch (e) {
      toast.error(e.message)
    }
  }

  const checkPayment = async (paymentId: string) => {
    try {
      const data = await checkPaymentFx({
        url: '/payment/info',
        paymentId
      })

      if (data.status === 'succeeded') {
        await removeFromCartFx(`/shopping-cart/all/${user.userId}`)
        sessionStorage.removeItem('paymentId')
        setShoppingCart([])
      }

    } catch (e) {
      toast.error(e.message)
      sessionStorage.removeItem('paymentId')
      await removeFromCartFx(`/shopping-cart/all/${user.userId}`)
      setShoppingCart([])
    }

  }

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
            <button onClick={makePay} className={styles.order__pay__btn} disabled={!(orderIsReady && agreement)}>
              {spinner
                ? <span className={spinnerStyles.spinner} style={{top: '6px', left: '47%'}}/>
                : ' Подтвердить заказ'
              }
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
