import {createEffect} from 'effector-next';
import {ISignInFX, ISignUpFX} from '../../types/auth';
import api from '../axiosClient'
import {toast} from 'react-toastify';
import {AxiosError} from 'axios';
import {HTTPStatus} from '../../constance/index';


export const signUpFX =  createEffect(async ({url, username, email, password}: ISignUpFX) => {
  const {data} = await api.post<ISignUpFX>(url, {username, email, password})

  if(data.warningMessage){
    toast.warning(data.warningMessage)
    return
  }

  toast.success('Регистрация прошла успешно!')
  return data
})


export const signInFX =  createEffect(async ({url, username, password}: ISignInFX) => {
  const {data} = await api.post<ISignInFX>(url, {username, password})

  if(data.warningMessage){
    toast.warning(data.warningMessage)
    return
  }

  toast.success('Вход выполен!')
  return data
})

export const LogOutFX =  createEffect(async (url: string) => {
  try {
   await api.get(url)
  } catch (e) {
    toast.error((e as Error).message)
  }

})

export const checkUserAuthFX =  createEffect(async (url: string) => {
  try {
    const {data} = await api.get(url)

    return data
  } catch (e) {
    const axiosError = e as AxiosError

    if(axiosError.response){
      if(axiosError.response.status === HTTPStatus.FORBIDDEN){
        return  false
      }
    }

    toast.error((e as Error).message)

  }


})
