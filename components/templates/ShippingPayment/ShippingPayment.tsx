import {useStore} from 'effector-react';
import {$mode} from '../../../context/mode';
import styles from '../../../styles/shippingPayment/index.module.scss';
import {motion} from "framer-motion";
import React from 'react';
import {tab1Text, tab2Text, tab3Text, tab4Text} from '../../../utils/shipping-payment';


export const ShippingPayment = () => {

  const [tab1, setTab1] = React.useState(true)
  const [tab2, setTab2] = React.useState(false)
  const [tab3, setTab3] = React.useState(false)
  const [tab4, setTab4] = React.useState(false)

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const toggleTab1 = () => {
    setTab1(true)
    setTab2(false)
    setTab3(false)
    setTab4(false)
  }

  const toggleTab2 = () => {
    setTab1(false)
    setTab2(true)
    setTab3(false)
    setTab4(false)
  }

  const toggleTab3 = () => {
    setTab1(false)
    setTab2(false)
    setTab3(true)
    setTab4(false)
  }

  const toggleTab4 = () => {
    setTab1(false)
    setTab2(false)
    setTab3(false)
    setTab4(true)
  }



  return (
    <section className={styles.shipping_payment}>
      <div className={'container'}>
        <h2 className={`${styles.shipping_payment__title} ${darkModeClass}`}>Доставка и оплата</h2>
        <div className={`${styles.shipping_payment__tabs} ${darkModeClass}`}>
          <ul className={styles.shipping_payment__tabs__controls}>
            <li className={`${styles.shipping_payment__tabs__controls__item} ${tab1 ? styles.active : ''} ${darkModeClass}`}>
              <button className={darkModeClass} onClick={toggleTab1}>Как работает курьерская доставка?</button>
            </li>
            <li className={`${styles.shipping_payment__tabs__controls__item} ${tab2 ? styles.active : ''} ${darkModeClass}`}>
              <button className={darkModeClass} onClick={toggleTab2}>Как получить товар из пункта самовывоза?</button>
            </li>
            <li className={`${styles.shipping_payment__tabs__controls__item} ${tab3 ? styles.active : ''} ${darkModeClass}`}>
              <button className={darkModeClass} onClick={toggleTab3}>Какие способы оплаты?</button>
            </li>
            <li className={`${styles.shipping_payment__tabs__controls__item} ${tab4 ? styles.active : ''} ${darkModeClass}`}>
              <button className={darkModeClass} onClick={toggleTab4}>Как узнать статус заказанного товара?</button>
            </li>
          </ul>
          <div className={`${styles.shipping_payment__tabs__content} ${darkModeClass}`}>
            {tab1 && (
              <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className={styles.shipping_payment__tabs__content__text}
              >
                {tab1Text}
              </motion.div>
            )}
            {tab2 && (
              <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className={styles.shipping_payment__tabs__content__text}
              >
                {tab2Text}
              </motion.div>
            )}
            {tab3 && (
              <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className={styles.shipping_payment__tabs__content__text}
              >
                {tab3Text}
              </motion.div>
            )}
            {tab4 && (
              <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className={styles.shipping_payment__tabs__content__text}
              >
                {tab4Text}
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}
