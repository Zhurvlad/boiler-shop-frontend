import {createEffect} from 'effector-next';
import {ISignInFX, ISignUpFX} from '../../types/auth';
import api from '../axiosClient'
import {toast} from 'react-toastify';


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
