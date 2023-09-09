import {useStore} from 'effector-react';
import {$mode} from '../../../context/mode';
import styles from '../../../styles/part/index.module.scss';
import {Accordion} from '../../elements/Accordion/Accordion';
import {IPartAccordionProps} from '../../../types/part';
import React from 'react';


export const PartPageAccordion = ({children, title}: IPartAccordionProps) => {

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  //Задаём бордер задиус при мобильном разрешении для свернутых элементов "Описание" и "Совместимость"
  const handleExpandAccordion = (expanded: boolean) => {
      const accordionTitles = document.querySelectorAll(`.${styles.part__accordion__title}`)

    accordionTitles.forEach((title) => {
      const item = title as HTMLElement

      if(!expanded){
        item.style.borderBottomLeftRadius = '0'
        item.style.borderBottomLeftRadius = '0'
      } else {
        item.style.borderBottomLeftRadius = '4px'
        item.style.borderBottomLeftRadius = '4px'
      }

    })
  }

  return (
    <Accordion title={title} titleClass={`${styles.part__accordion__title} ${darkModeClass}`}
               arrowOpenClass={styles.open} boxShadowStyles={'0px 2px 8px rgba(0,0,0 0.1'} callback={handleExpandAccordion} >
      {children}
    </Accordion>
  )
}
