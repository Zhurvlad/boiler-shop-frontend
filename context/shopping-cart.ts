import {createDomain, fork} from 'effector';
import {IShoppingCartItem} from '../types/shoppingCart';


const shoppingCart = createDomain()

export const setShoppingCart = shoppingCart.createEvent<IShoppingCartItem[]>()
export const updateShoppingCart = shoppingCart.createEvent<IShoppingCartItem>()
export const removeShoppingCartItem = shoppingCart.createEvent<number>()

export const setTotalPrice = shoppingCart.createEvent<number>()

export const updateCartItemTotalPrice = shoppingCart.createEvent<{ partId: number, total_price: number }>()

export const updateCartItemCount = shoppingCart.createEvent<{ partId: number, count: number }>()

const remove = (cartItems: IShoppingCartItem[], partId: number) =>
  cartItems.filter((i) => i.partId !== partId)



/*const updateTotalPrice = (cartItems: IShoppingCartItem[], partId: number, total_price: number) =>
  cartItems.map((i) => {
    if (i.partId === partId) {
      return {
        ...i,
        total_price,
      }
    }
    return i
  })

const updateCount = (cartItems: IShoppingCartItem[], partId: number, count: number) =>
  cartItems.map((i) => {
    if (i.partId === partId) {
      return {
        ...i,
        count,
      }
    }
    return i
  })*/

function updateCountAndTotalPrice<T>(cartItems: IShoppingCartItem[], partId: number, payload: T) {
  return cartItems.map((i) => {
    if (i.partId === partId) {
      return {
        ...i,
        ...payload,
      }
    }
    return i
  })
}

export const $shoppingCart = shoppingCart
  .createStore<IShoppingCartItem[]>([])
  .on(setShoppingCart, (_, shoppingCart) => shoppingCart)
  .on(updateShoppingCart, (state, cartItem) => [...state, cartItem])
  .on(removeShoppingCartItem, (state, partId) => [...remove(state, partId)])
  .on(updateCartItemTotalPrice, (state, {partId, total_price}) => [
    ...updateCountAndTotalPrice(state, partId, {total_price})])
  .on(updateCartItemCount, (state, {partId, count}) => [
    ...updateCountAndTotalPrice(state, partId, {count})
  ])

export const $totalPrice = shoppingCart
  .createStore<number>(0)
  .on(setTotalPrice, (_, value) => value)




/*
export const scope = fork(shoppingCart)

console.log('SCOPE', scope.getState($shoppingCart))

console.log('STORE',$shoppingCart.getState())
*/
