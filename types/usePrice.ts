import React, {useState} from 'react';
import {removeItemFromCart, updateTotalPrice} from '../utils/shopping-cart';
import {useStore} from 'effector-react';
import {removeFromCartFx} from '../app/api/shopping-cart';


export const usePrice = ( count: number, partId: number, initialPrice: number,) => {

 const spinner = useStore(removeFromCartFx.pending)

  const [price, setPrice] = useState(initialPrice)

  React.useEffect(() => {
    setPrice(price * count)
  }, [])

  React.useEffect(() => {
    updateTotalPrice(price, partId)
  }, [price])

  const increasePrice = () => setPrice(price + initialPrice)
  const decreasePrice = () => setPrice(price - initialPrice)
  const deleteCartItem = () => removeItemFromCart(partId)

  return ({price, spinner, increasePrice, decreasePrice, deleteCartItem})

}
