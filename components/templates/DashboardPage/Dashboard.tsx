import React from 'react';

import {BrandSlider} from '../../modules/DashboardPage/BrandsSlider';

import styles from '../../../styles/dashboard/index.module.scss'

export const DashboardPage = () => {
  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <div className={styles.dashboard__brands}>
          <BrandSlider/>
        </div>
      </div>
    </section>
  )
}
