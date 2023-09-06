import React from 'react';
import {useStore} from 'effector-react';

import {$mode} from '../../../context/mode';

import {ICartItemCounterProps} from '../../../types/shoppingCart';

import {MinusSvg} from '../MinusSvg/MinusSvg';
import {PlusSvg} from '../PlusSvg/PlusSvg';

import styles from '../../../styles/cartPopup/index.module.scss';
import spinnerStyles from '../../../styles/spinner/index.module.scss'
import {toast} from 'react-toastify';
import {updateCartItemFx} from '../../../app/api/shopping-cart';
import {updateCartItemCount} from '../../../context/shopping-cart';


export const CartItemCount = ({decreasePrice, increasePrice, initialCount, partId, totalCount}: ICartItemCounterProps) => {

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinnerDarkModeClass = mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`

  const [spinner, setSpinner] = React.useState(false)
  const [count, setCount] = React.useState(initialCount)

  const [disableIncrease, setDisableIncrease] = React.useState(false)
  const [disableDecrease, setDisableDecrease] = React.useState(false)

  React.useEffect(() => {
    if(count === 1){
      setDisableDecrease(true)
    }

    if(count === totalCount){
      setDisableIncrease(true)
    }

  }, [count, totalCount])

  console.log(count, totalCount)

  const increase = async () => {
    try {
      setSpinner(true)
      increasePrice()
      setDisableDecrease(false)
      setCount(count + 1)

      const dataCount = await updateCartItemFx({
        url: `/shopping-cart/count/${partId}`,
        payload: {count: count + 1}
      })

      updateCartItemCount({partId, count: dataCount.count})

    } catch (e) {
      toast.warning(e.message)
    } finally {
      setSpinner(false)
    }
  }

  const decrease = async () => {
    try {
      setSpinner(true)
      decreasePrice()
      setDisableIncrease(false)
      setCount(count - 1)

      const dataCount = await updateCartItemFx({
        url: `/shopping-cart/count/${partId}`,
        payload: {count: count - 1}
      })

      updateCartItemCount({partId, count: dataCount.count})

    } catch (e) {
      toast.warning(e.message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <div className={`${styles.cart__popup__list__item__counter} ${darkModeClass}`}>
      <button disabled={disableDecrease} onClick={decrease}>
        <MinusSvg/>
      </button>
      <span>
        {spinner ? <span className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`} style={{top: 4, left: 33, width: 20, height: 20}}/> : count}
      </span>
      <button disabled={disableIncrease} onClick={increase}>
        <PlusSvg/>
      </button>
    </div>
  )
}
