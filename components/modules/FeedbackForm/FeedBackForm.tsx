import {useStore} from 'effector-react';
import {$mode} from '../../../context/mode';
import styles from "../../../styles/feedbackForm/index.module.scss";
import NameInput from './NameInput';
import emailJs from '@emailjs/browser'
import {useForm} from 'react-hook-form';
import {FeedbackInputs} from '../../../types/feedbackForm';
import PhoneInput from './PhoneInput';
import EmailInput from './EmailInput';
import MessageInput from './MessageInput';
import React, {MutableRefObject, useRef} from 'react';
import {toast} from 'react-toastify';
import spinnerStyles from '../../../styles/spinner/index.module.scss'

export const FeedbackForm = () => {

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const {register, handleSubmit, formState: {errors}} = useForm<FeedbackInputs>()
  const [spinner, setSpinner] = React.useState(false)
  const formRef = useRef() as MutableRefObject<HTMLFormElement>

  const submitForm = () => {
    setSpinner(true)
    emailJs.sendForm('service_fuan091', 'template_ah56ehp', formRef.current, 'x-0vPFxdINm1BoUtx')
      .then((result) => {
        setSpinner(false)
        toast.success(`Сообщение отправлено! ${result.text}`)
      }).catch((e) => {
        setSpinner(false)
      toast.error(`Что то пошло не так! ${e.text}`)
    })

    formRef.current.reset()
  }

  return (
    <div className={`${styles.feedback_form} ${darkModeClass}`}>
      <h3 className={`${styles.feedback_form__title} ${darkModeClass}`}>Форма связи</h3>
      <form ref={formRef} className={styles.feedback_form__form} onChange={handleSubmit(submitForm)}>
        <NameInput register={register} errors={errors} darkModeClass={darkModeClass}/>
        <PhoneInput register={register} errors={errors} darkModeClass={darkModeClass}/>
        <EmailInput register={register} errors={errors} darkModeClass={darkModeClass}/>
        <MessageInput register={register} errors={errors} darkModeClass={darkModeClass}/>
        <div className={styles.feedback_form__form__btn}>
          <button>{spinner
            ? <span className={spinnerStyles.spinner} style={{top: '6px', left: '47%'}}/>
            : 'Отправить сообщение'
          }</button>
        </div>
      </form>
    </div>
  )
}
