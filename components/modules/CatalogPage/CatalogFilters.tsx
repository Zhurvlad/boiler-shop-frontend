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

export const CatalogFilters = ({
                                 priceRange, setPriceRange, setIsPriceRangeChanged,
                                 resetFilterBtnDisabled, resetFilters, isPriceRangeChanged,
                                 currentPage, setFilteredInQuery
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
      //Получаем параметры из квери
      const priceFromQueryValue = getQueryParamOnFirstRender('priceFrom', router)
      const priceToQueryValue = getQueryParamOnFirstRender('priceTo', router)
      const boilerQueryValue = JSON.parse(decodeURIComponent(getQueryParamOnFirstRender('boiler', router) as string))
      const partsQueryValue = JSON.parse(decodeURIComponent(getQueryParamOnFirstRender('parts', router) as string))

      //Проверяем не испорченали адресная строка
      const isValidBoilerQuery = Array.isArray(boilerQueryValue) && !!boilerQueryValue?.length
      const isValidPartsQuery = Array.isArray(partsQueryValue) && !!partsQueryValue?.length

      const boilerQuery = `&boiler=${getQueryParamOnFirstRender('boiler', router)}`
      const partsQuery = `&parts=${getQueryParamOnFirstRender('parts', router)}`
      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

      if(isValidBoilerQuery && isValidPartsQuery && priceFromQueryValue && priceToQueryValue){
       await updateParamsAndFiltersFromQuery(() => {
          setFilteredInQuery(true)
          setPriceRange([+priceFromQueryValue, +priceToQueryValue])
          setIsPriceRangeChanged(true)
         setBoilerManufacturersFromQuery(boilerQueryValue)
         setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${priceQuery}${boilerQuery}${partsQuery}`)
      }


    } catch (e) {
      toast.error((e as Error).message)
    }
  }
  //TODO: Разобраться с огромным количество рендеров ползунка с ценой. Добавить дебоунс
  console.log(isPriceRangeChanged, 1010)

  const updateParamsAndFiltersFromQuery = async (callback: () => void, path: string) => {
    callback()

    const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${path}`)
    setFilteredBoilerParts(data)
  }

  async function updateParamsAndFilters<T>(updateParams: T, path: string) {
    const params = router.query

    delete params.boiler
    delete params.parts
    delete params.priceTo
    delete params.priceFrom

    await router.push({
      query: {
        ...params,
        ...updateParams
      }
    }, undefined, {shallow: true})

    const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${path}`)
    setFilteredBoilerParts(data)

  }

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

      console.log(currentPage)

      if (boiler.length && parts.length && isPriceRangeChanged) {
        await updateParamsAndFilters({
          boiler: encodedBoilerQuery,
          parts: encodedPartsQuery,
          priceFrom,
          priceTo,
          offset: initialPage + 1,
        }, `${initialPage}${boilerQuery}${partsQuery}${priceQuery}`)
      }

      if (isPriceRangeChanged) {
        await updateParamsAndFilters({
          priceFrom,
          priceTo,
          offset: initialPage + 1
        }, `${initialPage}${priceQuery}`)
      }

      if (boiler.length && parts.length) {
        await updateParamsAndFilters({
          boiler: encodedBoilerQuery,
          parts: encodedPartsQuery,
          offset: initialPage + 1
        }, `${initialPage}${boilerQuery}${partsQuery}`)
      }

      if (boiler.length) {
        await updateParamsAndFilters({
          boiler: encodedBoilerQuery,
          offset: initialPage + 1
        }, `${initialPage}${boilerQuery}`)
      }

      if (parts.length) {
        await updateParamsAndFilters({
          parts: encodedPartsQuery,
          offset: initialPage + 1
        }, `${initialPage}${partsQuery}`)

      }

      if (boiler.length && isPriceRangeChanged) {
        await updateParamsAndFilters({
          priceFrom,
          priceTo,
          boiler: encodedBoilerQuery,
          offset: initialPage + 1
        }, `${initialPage}${boilerQuery}${priceQuery}`)
      }

      if (parts.length && isPriceRangeChanged) {
        await updateParamsAndFilters({
          priceFrom,
          priceTo,
          parts: encodedPartsQuery,
          offset: initialPage + 1
        }, `${initialPage}${partsQuery}${priceQuery}`)
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
        ? <div/>
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
