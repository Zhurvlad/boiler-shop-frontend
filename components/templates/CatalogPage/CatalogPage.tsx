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
import {CatalogItem} from '../../modules/CatalogPage/CatalogItem';
import ReactPaginate from 'react-paginate';
import {IQueryParams} from '../../../types/catalog';
import {useRouter} from 'next/router';
import {IBoilerParts} from '../../../types/boilerParts';


export const CatalogPage = ({query}: { query: IQueryParams }) => {

  const boilerParts = useStore($boilerParts)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const router = useRouter()

  const [spinner, setSpinner] = React.useState(false)

  const pageCount = Math.ceil(boilerParts.count / 20)

  const isValidOffset = query?.offset && !isNaN(+query.offset) && query.offset > 0
  const [currentPage, setCurrentPage] = React.useState(isValidOffset ? +query.offset - 1 : 0)

  React.useEffect(() => {
    loadBoilerParts()
  }, [])

  console.log(boilerParts.rows)

  const loadBoilerParts = async () => {
    try {
      setSpinner(true)
      const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')

      if (!isValidOffset) {
        await router.replace({
          query: {
            offset: 1
          }
        })
        resetPagination(data)
        return
      }

      if (isValidOffset) {
        if (+query.offset > Math.ceil(data.count / 20)) {
          await router.push({
            query: {
              ...query,
              offset: 1
            }
          }, undefined, {shallow: true})

          setCurrentPage(0)
          setBoilerParts(data)
          return
        }
      }

      const offset = +query.offset - 1
      const result = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${offset}`)

      setCurrentPage(offset)
      setBoilerParts(result)

    } catch (e) {
      toast.error((e as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  const resetPagination = (data: IBoilerParts) => {
    setCurrentPage(0)
    setBoilerParts(data)
  }

  const handlePageChange = async ({selected}: { selected: number }) => {
    try {
      const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')

      if (selected > pageCount) {
        resetPagination(data)
        return
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 20)) {
        resetPagination(data)
        return
      }

      const result = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${selected}`)

      await router.push({
        query: {
          ...router.query,
          offset: selected + 1
        }
      }, undefined, {shallow: true})

      setCurrentPage(selected)
      setBoilerParts(result)
    } catch (e) {

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
            <button className={`${styles.catalog__top__reset} ${darkModeClass}`} disabled={true}>Сбросить фильтр
            </button>
            <FilterSelect/>
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <div className={''}>Филтры</div>
            {spinner
              ? <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(8)).map((i) => (
                  <li
                    className={`${skeletonStyles.skeleton__item} ${mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''}`}
                    key={i}>
                    <div className={skeletonStyles.skeleton__item__light}/>
                  </li>
                ))}
              </ul>
              : <ul className={styles.catalog__list}>
                {boilerParts.rows?.length
                  ? boilerParts.rows.map((i) => <CatalogItem item={i} key={i.id}/>)
                  : <span>Список товаров пуст</span>}
              </ul>}
          </div>
          <ReactPaginate
            containerClassName={styles.catalog__bottom__list}
            pageClassName={styles.catalog__bottom__list__item}
            pageLinkClassName={styles.catalog__bottom__list__item__link}
            previousClassName={styles.catalog__bottom__list__prev}
            nextClassName={styles.catalog__bottom__list__next}
            breakClassName={styles.catalog__bottom__list__break}
            breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
            breakLabel={'...'}
            forcePage={currentPage}
            pageCount={pageCount}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}
