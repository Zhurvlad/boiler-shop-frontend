import React, {MutableRefObject, useRef} from 'react';
import {setTimeout} from 'timers';

import {useMediaQuery} from '../../../hooks/useMediaQuery';

import {SignUpForm} from '../../modules/AuthPage/SignUpForm';
import {SignInFrom} from '../../modules/AuthPage/SignInForm';

import styles from '@/styles/auth/index.module.scss'
import {ModeToggler} from '../../elements/ModeToggler/ModeToggler';
import {useStore} from 'effector-react';
import {$mode} from '../../../context/mode';

export const AuthPage = () => {

  const isMedia800 = useMediaQuery(800)

  const switchCtn = useRef() as MutableRefObject<HTMLDivElement>
  const switchC1 = useRef() as MutableRefObject<HTMLDivElement>
  const switchC2 = useRef() as MutableRefObject<HTMLDivElement>
  const switchCircle1 = useRef() as MutableRefObject<HTMLDivElement>
  const switchCircle2 = useRef() as MutableRefObject<HTMLDivElement>
  const aContainer = useRef() as MutableRefObject<HTMLDivElement>
  const bContainer = useRef() as MutableRefObject<HTMLDivElement>

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''


  const switchForm = (e) => {
    switchCtn.current.classList.add(styles.is_gx);
    setTimeout(() => {
      switchCtn.current?.classList.remove(styles.is_gx)
    }, 1500)

    switchCtn.current.classList.toggle(styles.is_txr);
    switchCircle1.current.classList.toggle(styles.is_txr);
    switchCircle2.current.classList.toggle(styles.is_txr);
    switchC1.current.classList.toggle(styles.is_hidden);
    switchC2.current.classList.toggle(styles.is_hidden);
    aContainer.current.classList.toggle(styles.is_txl);
    bContainer.current.classList.toggle(styles.is_txl);
    bContainer.current.classList.toggle(styles.is_z200);
  }

  return (
    <div>
      <div className={`${styles.main} ${darkModeClass}`}>
        <div className={styles.mode_toggle}>
          <ModeToggler/>
        </div>
        <div className={`${styles.container} ${styles.a_container} ${darkModeClass}`} ref={aContainer} id="a-container">
          <div className={styles.container__inner}>
            <SignUpForm switchForm={switchForm}/>
          </div>
        </div>
        <div className={`${styles.container} ${styles.b_container} ${darkModeClass}`} ref={bContainer} id="b-container">
          <div className={styles.container__inner}>
            <SignInFrom switchForm={switchForm}/>
          </div>
        </div>
        <div className={`${styles.switch} ${darkModeClass}`} ref={switchCtn} id="switch-cnt">
          <div className={`${styles.switch__circle} ${darkModeClass}`} ref={switchCircle1}/>
          <div className={`${styles.switch__circle} ${styles.switch__circle__t} ${darkModeClass}`} ref={switchCircle2}/>
          <div className={styles.switch__container} ref={switchC1} id="switch-c1">
            {!isMedia800 && <>
              <h2 className={`${styles.switch__title} ${styles.title} ${darkModeClass}`}>Добро пожаловать!</h2>
              <p className={`${styles.switch__description} ${styles.description} ${darkModeClass}`}>
                Чтобы оставаться на связи с нами, пожайлуста, войдите в свой аккаунт</p>

            </>}
            <button onClick={switchForm}
                    className={`${styles.switch__button} ${styles.button} ${styles.button} ${styles.switch__btn} ${darkModeClass}`}>
              SIGN IN
            </button>
          </div>
          <div className={`${styles.switch__container} ${styles.is_hidden}`} ref={switchC2} id="switch-c2">
            {isMedia800 && <>

              <h2 className={`${styles.switch__title} ${styles.title} ${darkModeClass}`}>Hello Friend !</h2>
              <p className={`${styles.switch__description} ${styles.description} ${darkModeClass}`}>Enter your personal details and start
                journey with us</p>


            </>}
            <button onClick={switchForm}
                    className={`${styles.switch__button} ${styles.button} ${styles.button} ${styles.switch__btn} ${darkModeClass}`}>SIGN
              UP
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
