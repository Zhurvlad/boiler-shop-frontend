import React from 'react';
import {AnimatePresence, motion} from 'framer-motion'
import {toast} from 'react-toastify';
import {useStore} from 'effector-react';

import {BrandSlider} from '../../modules/DashboardPage/BrandsSlider';
import {DashboardSlider} from '../../modules/DashboardPage/DashboardSlider';
import {CartAlert} from '../../modules/DashboardPage/CartAler';

import {getBestsellersOrNewPartsFx} from '../../../app/api/boilerParts';

import {$mode} from '../../../context/mode';
import {$shoppingCart} from '../../../context/shopping-cart';

import {IBoilerParts} from '../../../types/boilerParts';

import styles from '../../../styles/dashboard/index.module.scss'


export const DashboardPage = () => {
  const [newParts, setNewParts] = React.useState<IBoilerParts>({} as IBoilerParts)
  const [bestsellers, setBestsellers] = React.useState<IBoilerParts>({} as IBoilerParts)
  const [spinner, setSpinner] = React.useState(false)

  const shoppingCart = useStore($shoppingCart)
  const [showAlert, setShowAlert] = React.useState(!!shoppingCart.length)



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

  const totalCount = shoppingCart.reduce((sum, obj) => sum + obj.count, 0)

  const closeAlert = () => setShowAlert(false)

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <AnimatePresence>
          {showAlert
          && <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          className={`${styles.dashboard__alert} ${darkModeClass}`}
          >
            <CartAlert count={totalCount} closeAlert={closeAlert}/>
          </motion.div>}
        </AnimatePresence>
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
