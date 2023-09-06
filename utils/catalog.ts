import {getQueryParamOnFirstRender, idGenerator} from './common';
import {NextRouter} from 'next/router';
import {getBoilerPartsFx} from '../app/api/boilerParts';
import {setFilteredBoilerParts} from '../context/boilerParts';

const createManufacturerCheckObj = (title: string) => ({
  title,
  checked: false,
  id: idGenerator()
})

export const boilerManufacturers = [
  'Ariston',
  'Chaffoteaux&Maury',
  'Baxi',
  'Bongioanni',
  'Saunier Duval',
  'Buderus',
  'Strategist',
  'Henry',
  'Northwest',
].map(createManufacturerCheckObj)


export const partsManufacturers = [
  'Azure',
  'Gloves',
  'Cambridgeshire',
  'Salmon',
  'Montana',
  'Sensor',
  'Lesly',
  'Radian',
  'Gasoline',
  'Croatia',
].map(createManufacturerCheckObj)

const checkPriceFromQuery = (price: number) => price && !isNaN(price) && price >=0 && price <= 1000

export const checkQueryParams = (router: NextRouter) => {

  //Получаем параметры из квери
  const priceFromQueryValue = getQueryParamOnFirstRender('priceFrom', router) as string
  const priceToQueryValue = getQueryParamOnFirstRender('priceTo', router) as string
  const boilerQueryValue = JSON.parse(decodeURIComponent(getQueryParamOnFirstRender('boiler', router) as string))
  const partsQueryValue = JSON.parse(decodeURIComponent(getQueryParamOnFirstRender('parts', router) as string))

  //Проверяем не испорчена ли адресная строка
  const isValidBoilerQuery = Array.isArray(boilerQueryValue) && !!boilerQueryValue?.length
  const isValidPartsQuery = Array.isArray(partsQueryValue) && !!partsQueryValue?.length
  const isValidPriceQuery = checkPriceFromQuery(+priceFromQueryValue) && checkPriceFromQuery(+priceToQueryValue)

  return {
    isValidBoilerQuery,
    isValidPartsQuery,
    isValidPriceQuery,
    priceFromQueryValue,
    priceToQueryValue,
    boilerQueryValue,
    partsQueryValue
  }
}


export const updateParamsAndFiltersFromQuery = async (callback: () => void, path: string) => {
  callback()

  const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${path}`)
  setFilteredBoilerParts(data)
}


export async function updateParamsAndFilters<T>(updateParams: T, path: string, router:NextRouter) {
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
