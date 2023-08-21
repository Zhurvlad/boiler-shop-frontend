import React, {FC} from 'react';

import {IAuthInput} from '../../../types/auth';

import styles from '../../../styles/auth/index.module.scss';



export const NameInput:FC<IAuthInput> = ({register, errors}) => {
  return (
    <label className={styles.form__label}>
      <input
        className={styles.form__input}
        type="text"
        placeholder="Name"
        {...register("name", {
          required: "Введите имя!",
          minLength: 4,
          maxLength: 16,
          pattern: {
            value: /^[a-zA-Z]+[a-zA-Z]+$/,
            message: 'Непривильное имя'
          }
        })}
      />
      {errors.name && <span className={styles.error_alert}>{errors.name.message}</span>}
      {errors.name && errors.name.type === 'minLength' && <span className={styles.error_alert}>Минимум 4 символа!</span>}
      {errors.name && errors.name.type === 'maxLength' && <span className={styles.error_alert}>Максимум 16 символов!</span>}
    </label>
  )
}
