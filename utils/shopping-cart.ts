import {toast} from 'react-toastify';
import {addToCartFx, removeFromCartFx, updateCartItemFx} from '../app/api/shopping-cart';
import {removeShoppingCartItem, updateCartItemTotalPrice, updateShoppingCart} from '../context/shopping-cart';


export const toggleCartItem = async (username: string, partId: number, isInCart: boolean, setSpinner: (i: boolean) => void) => {
  try {
    setSpinner(true)

    if (isInCart) {
      await removeFromCartFx(`/shopping-cart/one/${partId}`)
      removeShoppingCartItem(partId)
      return
    }

    const data = await addToCartFx({
      url: '/shopping-cart/add',
      partId,
      username
    })

    updateShoppingCart(data)

  } catch (e) {
    toast.warning(e.message)
  } finally {
    setSpinner(false)
  }
}

export const removeItemFromCart = async (partId: number, setSpinner: (i: boolean) => void) => {
  try {
    setSpinner(true)
    await removeFromCartFx(`/shopping-cart/one/${partId}`)
    removeShoppingCartItem(partId)
  } catch (e) {
    toast.warning(e.message)
  } finally {
    setSpinner(false)

  }
}

export const updateTotalPrice = async (total_price: number, partId: number) => {
  const data = await updateCartItemFx({
    url: `/shopping-cart/total-price/${partId}`,
    payload: { total_price },
  })

  updateCartItemTotalPrice({ partId, total_price: data.total_price })
}
