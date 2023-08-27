import React from 'react';
import {useStore} from 'effector-react';
import {motion, AnimatePresence} from 'framer-motion';


import {$mode} from '../../../context/mode';


import styles from '../../../styles/catalog/index.module.scss';
import {IManufacturerBlockProps} from '../../../types/catalog';
import {ManufacturersBlockItem} from './ManufacturerBlockItem';


export const ManufacturersBlock = ({title, event, manufacturerList}: IManufacturerBlockProps) => {

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const checkedItem = manufacturerList.filter((i) => i.checked)

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      className={`${styles.manufacturers} ${darkModeClass}`}
    >
      <h3 className={`${styles.manufacturers__title} ${darkModeClass}`}>{title}</h3>
      <ul className={styles.manufacturers__list}>
        <AnimatePresence>
          {checkedItem.map((i) =>
            <ManufacturersBlockItem key={i.id} event={event} item={i}/>
          )}
        </AnimatePresence>
      </ul>
    </motion.div>
  )
}
