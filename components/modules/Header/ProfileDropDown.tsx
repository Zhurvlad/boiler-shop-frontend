import React, {forwardRef} from 'react';
import { AnimatePresence, motion } from 'framer-motion'


import {ProfileSvg} from '../../elements/ProfileSvg/ProfileSvg';
import {useStore} from 'effector-react';
import {$mode} from '../../../context/mode';

import styles from '../../../styles/profileDropDown/index.module.scss';
import {LogoutSvg} from '../../elements/LogOutSvg/LogOutSvg';
import {withClickOutside} from '../../../utils/withClickOutside';
import {IWrappedComponentProps} from '../../../types/common';
import {$user} from '../../../context/user';


const ProfileDropDown = forwardRef<HTMLDivElement, IWrappedComponentProps>(({opened, setOpened}, ref) => {

  const mode = useStore($mode)
  const user = useStore($user)
  console.log(user, 345)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const toggleProfileDropDown = () => setOpened(!opened)

  console.log(opened)

  return (
    <>
      <div ref={ref} className={styles.profile}>
        <button className={styles.profile__btn} onClick={toggleProfileDropDown}>
        <span className={styles.profile__span}>
          <ProfileSvg/>
        </span>
        </button>
        <AnimatePresence>
          {opened &&
          <motion.ul
            initial={{opacity: 0, scale: 0}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0}}
            className={`${styles.profile__dropdown} ${darkModeClass}`}
            style={{transformOrigin: 'right top'}}
          >
            <li className={styles.profile__dropdown__user}>
              <span className={`${styles.profile__dropdown__username} ${darkModeClass}`}>{user.username}</span>
              <span className={`${styles.profile__dropdown__email} ${darkModeClass}`}>{user.email}</span>
            </li>
            <li className={styles.profile__dropdown__item}>
              <button className={styles.profile__dropdown__item__btn}>
                <span className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}>Выйти</span>
                <span className={`${styles.profile__dropdown__item__svg} ${darkModeClass}`}>
                <LogoutSvg/>
              </span>
              </button>
            </li>
          </motion.ul>}
        </AnimatePresence>
      </div>
    </>
  )
})

export default withClickOutside(ProfileDropDown)
