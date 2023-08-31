import {createDomain} from 'effector';
import {IShoppingCartItem} from '../types/shoppingCart';
import {IBoilerPart, IBoilerParts} from '../types/boilerParts';
import {IFilterCheckboxItem} from '../types/catalog';
import {boilerManufacturers, partsManufacturers} from '../utils/catalog';

const boilerParts = createDomain()

export const setBoilerParts = boilerParts.createEvent<IBoilerParts>()

export const setBoilerPartsCheapFirst = boilerParts.createEvent()
export const setBoilerPartsExpensiveFirst = boilerParts.createEvent()
export const setBoilerPartsByPopularityFirst = boilerParts.createEvent()

export const setFilteredBoilerParts = boilerParts.createEvent<IBoilerParts>()


export const setBoilerManufacturers = boilerParts.createEvent<IFilterCheckboxItem[]>()
export const setPartsManufacturers = boilerParts.createEvent<IFilterCheckboxItem[]>()

export const updateBoilerManufacturers = boilerParts.createEvent<IFilterCheckboxItem>()
export const updatePartsManufacturers = boilerParts.createEvent<IFilterCheckboxItem>()

export const setBoilerManufacturersFromQuery = boilerParts.createEvent<string[]>()
export const setPartsManufacturersFromQuery = boilerParts.createEvent<string[]>()

const updateManufacturer = (manufacturers: IFilterCheckboxItem[], id: string , payload: Partial<IFilterCheckboxItem>) =>
  manufacturers.map((i) => {
    if(i.id === id){
      return {
        ...i,
        ...payload
      }
    }

    return i
  })

const updateManufacturerFromQuery = (manufacturers: IFilterCheckboxItem[], manufacturersFromQuery: string[]) =>
  manufacturers.map((i) => {
    if(manufacturersFromQuery.find((title) => title === i.title)){
      return {
        ...i,
        checked: true
      }
    }

    return i
  })

export const $boilerParts = boilerParts
  .createStore<IBoilerParts>({} as IBoilerParts)
  .on(setBoilerParts, (_, parts) => parts)
  .on(setBoilerPartsCheapFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => a.price - b.price)
  }))
  .on(setBoilerPartsExpensiveFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.price - a.price)
  }))
  .on(setBoilerPartsByPopularityFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.popularity - a.popularity)
  }))


export const $boilerManufacturers = boilerParts
  .createStore<IFilterCheckboxItem[]>(boilerManufacturers as IFilterCheckboxItem[])
  .on(setBoilerManufacturers, (_, parts) => parts)
  .on(updateBoilerManufacturers, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, {checked: payload.checked})])
  .on(setBoilerManufacturersFromQuery, (state, manufacturersFromQuery) => [
    ...updateManufacturerFromQuery(state, manufacturersFromQuery)])


export const $partsManufacturers = boilerParts
  .createStore<IFilterCheckboxItem[]>(partsManufacturers as IFilterCheckboxItem[])
  .on(setPartsManufacturers, (_, parts) => parts)
  .on(updatePartsManufacturers, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, {checked: payload.checked})])
  .on(setPartsManufacturersFromQuery, (state, manufacturersFromQuery) => [
    ...updateManufacturerFromQuery(state, manufacturersFromQuery)])


export const $filteredBoilerParts = boilerParts
  .createStore<IBoilerParts>(boilerManufacturers as IBoilerParts)
  .on(setFilteredBoilerParts, (_, parts) => parts)


