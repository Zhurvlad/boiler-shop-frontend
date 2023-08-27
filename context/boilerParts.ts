import {createDomain} from 'effector';
import {IShoppingCartItem} from '../types/shoppingCart';
import {IBoilerParts} from '../types/boilerParts';
import {IFilterCheckboxItem} from '../types/catalog';
import {boilerManufacturers, partsManufacturers} from '../utils/catalog';

const boilerParts = createDomain()

export const setBoilerParts = boilerParts.createEvent<IBoilerParts>()

export const setBoilerPartsCheapFirst = boilerParts.createEvent()
export const setBoilerPartsExpensiveFirst = boilerParts.createEvent()
export const setBoilerPartsByPopularityFirst = boilerParts.createEvent()

export const setBoilerManufacturers = boilerParts.createEvent<IFilterCheckboxItem[]>()
export const setPartsManufacturers = boilerParts.createEvent<IFilterCheckboxItem[]>()

export const updateBoilerManufacturers = boilerParts.createEvent<IFilterCheckboxItem>()
export const updatePartsManufacturers = boilerParts.createEvent<IFilterCheckboxItem>()

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
    ...updateManufacturer(state, payload.id as string, {checked: payload.checked})
  ])


export const $partsManufacturers = boilerParts
  .createStore<IFilterCheckboxItem[]>(partsManufacturers as IFilterCheckboxItem[])
  .on(setPartsManufacturers, (_, parts) => parts)
  .on(updatePartsManufacturers, (state, payload) => [
    ...updateManufacturer(state, payload.id as string, {checked: payload.checked})
  ])


