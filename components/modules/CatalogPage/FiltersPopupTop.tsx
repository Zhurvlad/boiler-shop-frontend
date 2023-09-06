import React from 'react';
import {useStore} from 'effector-react';

import {$mode} from '../../../context/mode';

import {IFiltersPopupTop} from '../../../types/catalog';

import styles from '../../../styles/catalog/index.module.scss';


export const FiltersPopupTop = ({closePopup, resetBtnText, resetFilterBtnDisabled, resetFilters, title}: IFiltersPopupTop) => {

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''


  return (
    <div className={`${styles.catalog__bottom__filters__top} ${darkModeClass}`}>
      <button
        onClick={closePopup}
        className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}
      >
        {title}
      </button>
      <button
        className={styles.catalog__bottom__filters__reset}
        onClick={resetFilters}
        disabled={resetFilterBtnDisabled}
      >
        {resetBtnText}
      </button>
    </div>
  )
}
