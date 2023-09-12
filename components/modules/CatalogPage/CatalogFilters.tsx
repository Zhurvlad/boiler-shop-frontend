import {useMediaQuery} from '../../../hooks/useMediaQuery';
import {CatalogFiltersDesktop} from './CatalogFiltersDesktop';
import {ICatalogFiltersProps} from '../../../types/catalog';
import React from 'react';
import {toast} from 'react-toastify';
import {useStore} from 'effector-react';
import {
  $boilerManufacturers,
  $partsManufacturers, setBoilerManufacturersFromQuery,
  setFilteredBoilerParts,
  setPartsManufacturersFromQuery
} from '../../../context/boilerParts';
import {useRouter} from 'next/router';
import {getBoilerPartsFx} from '../../../app/api/boilerParts';
import {getQueryParamOnFirstRender} from '../../../utils/common';
import {CatalogFiltersMobile} from './CatalogFiltersMobile';
import {checkQueryParams, updateParamsAndFilters, updateParamsAndFiltersFromQuery} from '../../../utils/catalog';

export const CatalogFilters = ({
                                 priceRange, setPriceRange, setIsPriceRangeChanged,
                                 resetFilterBtnDisabled, resetFilters, isPriceRangeChanged,
                                 currentPage, setFilteredInQuery, closePopup, filtersMobileOpen
                               }: ICatalogFiltersProps) => {
  const isMobile = useMediaQuery(820)
  const [spinner, setSpinner] = React.useState(false)
  const router = useRouter()

  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)

  React.useEffect(() => {
    applyFiltersFromQuery()
  }, [])


  const applyFiltersFromQuery = async () => {
    try {
      const {
        isValidBoilerQuery,
        isValidPartsQuery,
        isValidPriceQuery,
        priceFromQueryValue,
        priceToQueryValue,
        boilerQueryValue,
        partsQueryValue
      } = checkQueryParams(router)

      const boilerQuery = `&boiler=${getQueryParamOnFirstRender('boiler', router)}`
      const partsQuery = `&parts=${getQueryParamOnFirstRender('parts', router)}`
      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

      if (isValidBoilerQuery && isValidPartsQuery && isValidPriceQuery) {
        await updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setBoilerManufacturersFromQuery(boilerQueryValue)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${priceQuery}${boilerQuery}${partsQuery}`)
        return
      }

      if (priceFromQueryValue && priceToQueryValue) {
        await updateParamsAndFiltersFromQuery(() => {
          setFilteredInQuery(true)
          setPriceRange([+priceFromQueryValue, +priceToQueryValue])
          setIsPriceRangeChanged(true)
        }, `${currentPage}${priceQuery}`)
        return
      }

      if (isValidBoilerQuery && isValidPartsQuery) {
        await updateParamsAndFiltersFromQuery(() => {
          setFilteredInQuery(true)
          setBoilerManufacturersFromQuery(boilerQueryValue)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${boilerQuery}${partsQuery}`)
        return
      }

      if (isValidBoilerQuery) {
        await updateParamsAndFiltersFromQuery(() => {
          setFilteredInQuery(true)
          setBoilerManufacturersFromQuery(boilerQueryValue)
        }, `${currentPage}${boilerQuery}`)
        return
      }

      if (isValidPartsQuery) {
        await updateParamsAndFiltersFromQuery(() => {
          setFilteredInQuery(true)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${partsQuery}`)
        return
      }

      if (isValidPartsQuery && isValidPriceQuery) {
        await updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${priceQuery}${partsQuery}`)
        return
      }

      if (isValidBoilerQuery && isValidPriceQuery) {
        await updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setBoilerManufacturersFromQuery(boilerQueryValue)
        }, `${currentPage}${priceQuery}${boilerQuery}`)
        return
      }

    } catch (e) {
      const err = e as Error
      if(err.message === 'URI malformed'){
        toast.warning('Неправильный url для фильтров')
        return
      }
      toast.error(e.message)
    }
  }
  const updatePriceFromQuery = (priceFromQueryValue: number, priceToQueryValue: number) => {
    setFilteredInQuery(true)
    setPriceRange([priceFromQueryValue, priceToQueryValue])
    setIsPriceRangeChanged(true)
  }

  /*//TODO: Разобраться с огромным количество рендеров ползунка с ценой. Добавить дебоунс
  console.log(isPriceRangeChanged, 1010)*/

  const applyFilters = async () => {
    setFilteredInQuery(true)
    try {
      setSpinner(true)
      const priceFrom = Math.ceil(priceRange[0])
      const priceTo = Math.ceil(priceRange[1])
      const priceQuery = isPriceRangeChanged ? `&priceFrom=${priceFrom}&priceTo=${priceTo}` : ''

      const boiler = boilerManufacturers.filter((i) => i.checked).map((i) => i.title)
      const parts = partsManufacturers.filter((i) => i.checked).map((i) => i.title)

      //Устанавливаем массив в квери параметры
      const encodedBoilerQuery = encodeURIComponent(JSON.stringify(boiler))
      const encodedPartsQuery = encodeURIComponent(JSON.stringify(parts))

      const boilerQuery = `&boiler=${encodedBoilerQuery}`
      const partsQuery = `&parts=${encodedPartsQuery}`

      const initialPage = currentPage > 0 ? 0 : currentPage

     /* console.log(currentPage)*/

      if (boiler.length && parts.length && isPriceRangeChanged) {
        await updateParamsAndFilters({
          boiler: encodedBoilerQuery,
          parts: encodedPartsQuery,
          priceFrom,
          priceTo,
          offset: initialPage + 1,
        }, `${initialPage}${priceQuery}${boilerQuery}${partsQuery}`,
          router
          )
          return
      }

      if (isPriceRangeChanged) {
        await updateParamsAndFilters({
          priceFrom,
          priceTo,
          offset: initialPage + 1
        }, `${initialPage}${priceQuery}`,
          router)
      }

      if (boiler.length && parts.length) {
        await updateParamsAndFilters({
          boiler: encodedBoilerQuery,
          parts: encodedPartsQuery,
          offset: initialPage + 1
        }, `${initialPage}${boilerQuery}${partsQuery}`,
          router)
        return
      }

      if (boiler.length) {
        await updateParamsAndFilters({
          boiler: encodedBoilerQuery,
          offset: initialPage + 1
        }, `${initialPage}${boilerQuery}`,
          router)
      }

      if (parts.length) {
        await updateParamsAndFilters({
          parts: encodedPartsQuery,
          offset: initialPage + 1
        }, `${initialPage}${partsQuery}`,
          router)

      }

      if (boiler.length && isPriceRangeChanged) {
        await updateParamsAndFilters({
          priceFrom,
          priceTo,
          boiler: encodedBoilerQuery,
          offset: initialPage + 1
        }, `${initialPage}${boilerQuery}${priceQuery}`,
          router)
      }

      if (parts.length && isPriceRangeChanged) {
        await updateParamsAndFilters({
          priceFrom,
          priceTo,
          parts: encodedPartsQuery,
          offset: initialPage + 1
        }, `${initialPage}${partsQuery}${priceQuery}`,
          router)
      }

    } catch (e) {
      toast.error((e as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <>
      {isMobile
        ? <CatalogFiltersMobile
          closePopup={closePopup}
          spinner={spinner}
          applyFilters={applyFilters}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetFilters}
          filtersMobileOpen={filtersMobileOpen}
        />
        : <CatalogFiltersDesktop
          priceRange={priceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          setPriceRange={setPriceRange}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          spinner={spinner}
          resetFilters={resetFilters}
          applyFilters={applyFilters}
        />}
    </>
  )
}
