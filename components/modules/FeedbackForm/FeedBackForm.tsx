import {useStore} from 'effector-react';
import {$mode} from '../../../context/mode';
import styles from "../../../styles/feedbackForm/index.module.scss";
import NameInput from './NameInput';
import {useForm} from 'react-hook-form';
import {FeedbackInputs} from '../../../types/feedbackForm';
import PhoneInput from './PhoneInput';
import EmailInput from './EmailInput';
import MessageInput from './MessageInput';


export const FeedbackForm = () => {

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const {register, handleSubmit, formState: {errors}} = useForm<FeedbackInputs>()

  const submitForm = (data: FeedbackInputs) => (
    console.log(data)
  )

  return (
    <div className={`${styles.feedback_form} ${darkModeClass}`}>
      <h3 className={`${styles.feedback_form__title} ${darkModeClass}`}>Форма связи</h3>
      <form className={styles.feedback_form__form} onChange={handleSubmit(submitForm)}>
        <NameInput register={register} errors={errors} darkModeClass={darkModeClass}/>
        <PhoneInput register={register} errors={errors} darkModeClass={darkModeClass}/>
        <EmailInput register={register} errors={errors} darkModeClass={darkModeClass}/>
        <MessageInput register={register} errors={errors} darkModeClass={darkModeClass}/>
        <div className={styles.feedback_form__form__btn}>
          <button>Отправить сообщение</button>
        </div>
      </form>
    </div>
  )
}
