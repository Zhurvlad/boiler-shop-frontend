import React from 'react';

import {AnimatePresence} from 'framer-motion'
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import {useStore} from 'effector-react';
import ReactPaginate from 'react-paginate';

import {$mode} from '../../../context/mode';
import {getBoilerPartsFx} from '../../../app/api/boilerParts';
import {
  $boilerManufacturers,
  $boilerParts, $filteredBoilerParts,
  $partsManufacturers, scopeA, setBoilerManufacturers,
  setBoilerParts, setPartsManufacturers,
  updateBoilerManufacturers, updatePartsManufacturers
} from '../../../context/boilerParts';

import {ManufacturersBlock} from '../../modules/CatalogPage/ManufacturersBlock';
import {FilterSelect} from '../../modules/CatalogPage/FilterSelect';
import {CatalogItem} from '../../modules/CatalogPage/CatalogItem';
import {CatalogFilters} from '../../modules/CatalogPage/CatalogFilters';

import {IQueryParams} from '../../../types/catalog';
import {IBoilerParts} from '../../../types/boilerParts';

import skeletonStyles from '../../../styles/skeleton/index.module.scss'
import styles from '../../../styles/catalog/index.module.scss'
import {setTimeout} from 'timers';
import {usePopup} from '../../../hooks/usePopup';
import {checkQueryParams} from '../../../utils/catalog';
import {FilterSvg} from '../../elements/FilterSvg/FilterSvg';
import {$shoppingCart, scope} from '../../../context/shopping-cart';


export const CatalogPage = ({query}: { query: IQueryParams }) => {

  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)
  const filteredBoilerParts = useStore($filteredBoilerParts)
  const boilerParts = useStore($boilerParts)
  const mode = useStore($mode)

  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const router = useRouter()

  const [spinner, setSpinner] = React.useState(false)
  const [isFilteredInQuery, setFilteredInQuery] = React.useState(false)

  const [priceRange, setPriceRange] = React.useState([0, 10000])
  const [isPriceRangeChanged, setIsPriceRangeChanged] = React.useState(false)
  const isAnyBoilerManufacturerChecked = boilerManufacturers.some((i) => i.checked)
  const isAnyPartsManufacturerChecked = partsManufacturers.some((i) => i.checked)


  const resetFilterBtnDisabled = !(
    isPriceRangeChanged
    || isAnyBoilerManufacturerChecked
    || isAnyPartsManufacturerChecked)


  const pageCount = Math.ceil(boilerParts.count / 20)

  /*console.log(boilerParts.rows)*/

  const isValidOffset = query?.offset && !isNaN(+query.offset) && query.offset > 0
  const [currentPage, setCurrentPage] = React.useState(isValidOffset ? +query.offset - 1 : 0)

  const {toggleOpen, open, closePopup} = usePopup()

  React.useEffect(() => {
    loadBoilerParts()
  }, [filteredBoilerParts, isFilteredInQuery])


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
          setBoilerParts(isFilteredInQuery ? filteredBoilerParts : data)
          return
        }
        const offset = +query.offset - 1
        const result = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${offset}`)

        setCurrentPage(offset)
        setBoilerParts(isFilteredInQuery ? filteredBoilerParts : result)
        return
      }

      setCurrentPage(0)
      setBoilerParts(isFilteredInQuery ? filteredBoilerParts : data)

    } catch (e) {
      toast.error((e as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  const resetPagination = (data: IBoilerParts) => {
    setCurrentPage(0)
    setBoilerParts(data)
  }

  /*console.log('SCOPE', scope.getState($shoppingCart))*/

/*
  console.log('BOILER', scopeA.getState($boilerParts))
*/



  const handlePageChange = async ({selected}: { selected: number }) => {
    try {
      setSpinner(true)
      const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')

      if (selected > pageCount) {
        resetPagination(isFilteredInQuery ? filteredBoilerParts : data)
        return
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 20)) {
        resetPagination(isFilteredInQuery ? filteredBoilerParts : data)
        return
      }

      const {
        isValidBoilerQuery,
        isValidPartsQuery,
        isValidPriceQuery,
      } = checkQueryParams(router)

      const result = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${selected}
        ${isFilteredInQuery && isValidBoilerQuery ? `&boiler=${router.query.boiler}` : ''}
        ${isFilteredInQuery && isValidPartsQuery ? `&parts=${router.query.parts}` : ''}
        ${isFilteredInQuery && isValidPriceQuery
        ? `&priceFrom=${router.query.priceFrom}&priceTo=${router.query.priceTo}` : ''}
        `)

      await router.push({
        query: {
          ...router.query,
          offset: selected + 1
        }
      }, undefined, {shallow: true})

      setCurrentPage(selected)
      setBoilerParts(result)
    } catch (e) {
      toast.error((e as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  const resetFilters = async () => {
    try {
      const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')
      const params = router.query

      delete params.boiler
      delete params.parts
      delete params.priceTo
      delete params.priceFrom
      params.first = 'cheap'

      await router.push({query: {...params}}, undefined, {shallow: true})


      setBoilerManufacturers(boilerManufacturers.map((i) => ({...i, checked: false})))
      setPartsManufacturers(partsManufacturers.map((i) => ({...i, checked: false})))

      setBoilerParts(data)
      setPriceRange([0, 10000])
      setIsPriceRangeChanged(false)
    } catch (e) {

    }
  }

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>Каталог товаров</h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          <AnimatePresence>
            {isAnyBoilerManufacturerChecked && <ManufacturersBlock
              event={updateBoilerManufacturers}
              manufacturerList={boilerManufacturers}
              title={"Производитель котлов:"}/>}
          </AnimatePresence>
          <AnimatePresence>
            {isAnyPartsManufacturerChecked && <ManufacturersBlock
              event={updatePartsManufacturers}
              manufacturerList={partsManufacturers}
              title={"Производитель запчастей"}/>}
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button onClick={resetFilters}
                    className={`${styles.catalog__top__reset} ${darkModeClass}`} disabled={resetFilterBtnDisabled}
            >Сбросить фильтр
            </button>
            <button className={styles.catalog__top__mobile_btn} onClick={toggleOpen}>
              <span className={styles.catalog__top__mobile_btn__svg}>
                <FilterSvg/>
              </span>
              <span className={styles.catalog__top__mobile_btn__text}>Фильтр</span>
            </button>
            <FilterSelect setSpinner={setSpinner}/>
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <CatalogFilters priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            setIsPriceRangeChanged={setIsPriceRangeChanged}
                            resetFilterBtnDisabled={resetFilterBtnDisabled}
                            resetFilters={resetFilters}
                            isPriceRangeChanged={isPriceRangeChanged}
                            currentPage={currentPage}
                            setFilteredInQuery={setFilteredInQuery}
                            closePopup={closePopup}
                            filtersMobileOpen={open}

            />
            {spinner
              ? <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(20)).map((i, index) => (
                  <li
                    className={`${skeletonStyles.skeleton__item} ${mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''}`}
                    key={index}>
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
