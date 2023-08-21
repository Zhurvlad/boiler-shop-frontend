import React, {FC} from 'react';

import {IAuthInput} from '../../../types/auth';

import styles from '../../../styles/auth/index.module.scss';



export const EmailInput:FC<IAuthInput> = ({register, errors}) => {
  return (
    <label className={styles.form__label}>
      <input
        className={styles.form__input}
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "Введите email!",
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: 'Непривильный email'
          }
        })}
      />
      {errors.email && <span className={styles.error_alert}>{errors.email.message}</span>}

    </label>
  )
}
