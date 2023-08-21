import React, {FC} from 'react';

import {IAuthInput} from '../../../types/auth';

import styles from '../../../styles/auth/index.module.scss';



export const PasswordInput:FC<IAuthInput> = ({register, errors}) => {
  return (
    <label className={styles.form__label}>
      <input
        className={styles.form__input}
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "Введите пароль!",
          minLength: 8,
          maxLength: 20,
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: 'Пароль должен содержать хотя бы одну букву или цифру'
          }
        })}
      />
      {errors.password && <span className={styles.error_alert}>{errors.password.message}</span>}
      {errors.password && errors.password.type === 'minLength' && <span className={styles.error_alert}>Минимум 8 символа!</span>}
      {errors.password && errors.password.type === 'maxLength' && <span className={styles.error_alert}>Максимум 20 символов!</span>}
    </label>
  )
}
