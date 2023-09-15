import {createEffect} from 'effector';
import {ICheckPayFx, IMakePayFx} from '../../types/order';
import api from '../axiosClient'



export const makePaymentFx = createEffect(
  async ({url, amount, description}: IMakePayFx) => {
    const {data} = await api.post (url, {amount, description})

    return data
  }
)




export const checkPaymentFx = createEffect(
  async ({url, paymentId}: ICheckPayFx) => {
    const {data} = await api.post (url, {paymentId})

    return data
  }
)
