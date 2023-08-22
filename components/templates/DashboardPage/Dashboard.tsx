import React from 'react';

import {BrandSlider} from '../../modules/DashboardPage/BrandsSlider';

import styles from '../../../styles/dashboard/index.module.scss'
import {IBoilerParts} from '../../../types/boilerParts';
import {getBestsellersOrNewPartsFx} from '../../../app/api/boilerParts';
import {toast} from 'react-toastify';
import {useStore} from 'effector-react';
import {$mode} from '../../../context/mode';
import {DashboardSlider} from '../../modules/DashboardPage/DashboardSlider';

//TODO: Посмотреть типизацию

export const DashboardPage = () => {
  const [newParts, setNewParts] = React.useState<IBoilerParts>({} as IBoilerParts)
  const [bestsellers, setBestsellers] = React.useState<IBoilerParts>({} as IBoilerParts)
  const [spinner, setSpinner] = React.useState(false)

  console.log(bestsellers)

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  React.useEffect(() => {
    loadBoilerParts()
  }, [])

  const loadBoilerParts = async () => {
    try {
      setSpinner(true)
      const getBestsellers = await getBestsellersOrNewPartsFx('/boiler-parts/bestsellers')
      const getNewParts = await getBestsellersOrNewPartsFx('/boiler-parts/new')

      setBestsellers(getBestsellers)
      setNewParts(getNewParts)
    } catch (e) {
      toast.error((e as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <div className={styles.dashboard__brands}>
          <BrandSlider/>
        </div>
        <h2 className={`${styles.dashboard__title} ${darkModeClass}`}>Детали газовых котлов</h2>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>Хиты продаж</h3>
          <DashboardSlider items={bestsellers.rows || []} spinner={spinner} goToPartPage/>
        </div>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Новинки
          </h3>
          <DashboardSlider items={newParts.rows || []} spinner={spinner} goToPartPage/>
        </div>
        <div className={styles.dashboard__about}>
          <h3 className={`${styles.dashboard__parts__title} ${styles.dashboard__about__title} ${darkModeClass}`}>О
            компании</h3>
          <p className={`${styles.dashboard__about__text}  ${darkModeClass}`}>Инструкции и схемы помогут разобраться в
            эксплуатации, определить неисправность и правильно выбрать запчасть для ремонта Вашего газового
            оборудования. Купить запчасть, деталь для ремонта газового котла возможно в любом населенном пункте
            Российской Федерации:
            Осуществляем доставку запчасти к газовым котлам в следующие города: Москва, Сан</p>
        </div>
      </div>
    </section>
  )
}
