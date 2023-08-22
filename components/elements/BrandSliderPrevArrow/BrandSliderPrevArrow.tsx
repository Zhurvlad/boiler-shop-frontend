import React from 'react';

import {BrandSliderArrow} from '../BrandsSliderArrow/BrandSliderArrow';
import {IBrandsSliderArrow} from '../../../types/elements';

import styles from '../../../styles/dashboard/index.module.scss'


export const BrandsSliderPrevArrow = (props: IBrandsSliderArrow) => (
  <button
    className={`${styles.dashboard__brands__slider__arrow} ${styles.dashboard__brands__slider__arrow_prev} ${props.modeClass}`}
    onClick={props.onClick}
  >
    <span>
      <BrandSliderArrow/>
    </span>
  </button>
)
