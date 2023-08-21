import React, {FC} from 'react';
import {useRouter} from 'next/router';

import {PasswordInput} from '../../elements/AuthPage/PasswordInput';
import {NameInput} from '../../elements/AuthPage/NameInput';
import {useForm} from 'react-hook-form';
import {IInputs} from '../../../types/auth';
import {signUpFX} from '../../../app/api/auth';
import {showAuthError} from '../../../utils/errors';

import styles from '../../../styles/auth/index.module.scss'
import spinnerStyles from '../../../styles/spinner/index.module.scss'
import {useStore} from 'effector-react';
import {$mode} from '../../../context/mode';



type SignInForm =  {
  switchForm: () => void
}


export const SignInFrom:FC<SignInForm> = ({switchForm}) => {
  const [spinner, setSpinner] = React.useState(false)
  const route = useRouter()

  const {register, formState: {errors}, handleSubmit, reset} = useForm<IInputs>()

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''


  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)
     const userData =  await signUpFX({
        url: '/users/login',
        username: data.name,
        password: data.password
      })
      console.log(userData)
      switchForm()
      reset()
      route.push('/dashbord')

    } catch (error) {
      showAuthError(error)
    }
    finally {
      setSpinner(false)
    }
  }

  return (
    <form className={`${styles.form} ${darkModeClass}`} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={`${styles.form__title} ${styles.title} ${darkModeClass}`}>Sign in to Website</h2>
      <NameInput register={register} errors={errors}/>
      <PasswordInput register={register} errors={errors}/>
      <button className={`${styles.form__button} ${styles.button} ${styles.submit} ${darkModeClass}`}>
        {spinner ? <div className={spinnerStyles.spinner}/> : 'Войти'}
      </button>
    </form>
  )
}
