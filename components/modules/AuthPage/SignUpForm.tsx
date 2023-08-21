import React, {FC} from 'react';


import {NameInput} from '../../elements/AuthPage/NameInput';
import {EmailInput} from '../../elements/AuthPage/EmailInput';
import {PasswordInput} from '../../elements/AuthPage/PasswordInput';
import {useForm} from 'react-hook-form';
import {IInputs} from '../../../types/auth';
import {signUpFX} from '../../../app/api/auth';
import {showAuthError} from '../../../utils/errors';


import styles from '../../../styles/auth/index.module.scss'
import spinnerStyles from '../../../styles/spinner/index.module.scss';
import {useStore} from 'effector-react';
import {$mode} from '../../../context/mode';


type SignUpForm = {
  switchForm: () => void
}

export const SignUpForm: FC<SignUpForm> = ({switchForm}) => {
  const [spinner] = React.useState(false)
  const {register, formState: {errors}, handleSubmit, reset} = useForm<IInputs>()

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const onSubmit = async (data: IInputs) => {
    try {
      const userData = await signUpFX({
        url: '/users/signup',
        username: data.name,
        email: data.email,
        password: data.password
      })

      if(!userData){
        return
      }

      switchForm()
      reset()


    } catch (error) {
      showAuthError(error)
    }
  }

  return (
    <form className={`${styles.form} ${darkModeClass}`} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={`${styles.form__title} ${styles.title} ${darkModeClass}`}>Создать аккаунт</h2>
      <NameInput register={register} errors={errors}/>
      <EmailInput register={register} errors={errors}/>
      <PasswordInput register={register} errors={errors}/>
      <button className={`${styles.form__button} ${styles.button} ${styles.submit} ${darkModeClass}`}>
        {spinner ? <div className={spinnerStyles.spinner}/> : 'Зарегестрироваться'}
      </button>
    </form>
  )
}
