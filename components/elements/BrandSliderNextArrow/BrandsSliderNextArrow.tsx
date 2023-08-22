import React from 'react';

import {BrandSliderArrow} from '../BrandsSliderArrow/BrandSliderArrow';
import {IBrandsSliderArrow} from '../../../types/elements';

import styles from '../../../styles/dashboard/index.module.scss'


export const BrandsSliderNextArrow = (props:  IBrandsSliderArrow) => (
  <button
    onClick={props.onClick}
    className={`${styles.dashboard__brands__slider__arrow} ${styles.dashboard__brands__slider__arrow_next} ${props.modeClass}`}>
    <span>
      <BrandSliderArrow/>
    </span>
  </button>
)
