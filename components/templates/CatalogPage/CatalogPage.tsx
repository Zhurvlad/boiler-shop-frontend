import React from 'react';

import {AnimatePresence} from 'framer-motion'
import {toast} from 'react-toastify';
import {useStore} from 'effector-react';

import {$mode} from '../../../context/mode';
import styles from '../../../styles/catalog/index.module.scss'
import {ManufacturersBlock} from '../../modules/CatalogPage/ManufacturersBlock';
import {FilterSelect} from '../../modules/CatalogPage/FilterSelect';
import {getBoilerPartsFx} from '../../../app/api/boilerParts';
import {$boilerParts, setBoilerParts} from '../../../context/boilerParts';
import skeletonStyles from '../../../styles/skeleton/index.module.scss'


export const CatalogPage = () => {

  const mode = useStore($mode)
  const boilerParts = useStore($boilerParts)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const [spinner, setSpinner] = React.useState(false)

  React.useEffect(() => {
    loadBoilerParts()
  }, [])


  const loadBoilerParts = async () => {
    try {
      setSpinner(true)
      const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')

      setBoilerParts(data)
    } catch (e) {
      toast.error((e as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>Каталог товаров</h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          <AnimatePresence>
            <ManufacturersBlock title={"Производитель котлов:"}/>
          </AnimatePresence>
          <AnimatePresence>
            <ManufacturersBlock title={"Производитель запчастей"}/>
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button>Сбросить фильтр</button>
            <FilterSelect/>
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <div>Филтры</div>
            {true
              ? <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(8)).map((i) => (
                  <li className={`${skeletonStyles.skeleton__item} ${mode === 'dark' ? `.${skeletonStyles.dark_mode}` : ''}`} key={i}>
                    <div className={skeletonStyles.skeleton__item__light}/>
                  </li>
                ))}
              </ul>
              : <ul className={styles.catalog__list}>
                {boilerParts.rows?.length
                  ? boilerParts.rows.map((i) => <li key={i.id}>{}</li>)
                  : <span>Список товаров пуст</span>}
              </ul>}

          </div>
        </div>
      </div>
    </section>
  )
}
