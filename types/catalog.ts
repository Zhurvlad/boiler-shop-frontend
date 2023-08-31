import {Event} from 'effector-next'


export interface IManufacturerBlockProps {
  title: string
  event: Event<IFilterCheckboxItem>,
  manufacturerList: IFilterCheckboxItem[],
}

export interface IManufacturerBlockItemProps {
  item: IFilterCheckboxItem,
  event: Event<IFilterCheckboxItem>,
}

export interface IQueryParams {
  offset: string,
  first: string,
  boiler: string,
  parts: string,
  priceFrom: string,
  priceTo: string
}


export interface IFilterCheckboxItem {
  title: string,
  checked: boolean,
  id?: string,
  event: Event<IFilterCheckboxItem>
}

export interface IFilterManufacturerAccordionProps {
  manufacturerList: IFilterCheckboxItem[],
  title: string | false,
  setManufacturer: Event<IFilterCheckboxItem[]>,
  updateManufacturer: Event<IFilterCheckboxItem>
}

export interface ICatalogFiltersProps {
  priceRange: number[],
  setPriceRange: (i: number[]) => void,
  setIsPriceRangeChanged: (i: boolean) => void,
  resetFilterBtnDisabled: boolean,
  resetFilters: () => void
  isPriceRangeChanged: boolean
  currentPage: number
  setFilteredInQuery: (i: boolean) => void

}

export interface IPriceRange {
  priceRange: number[],
  setPriceRange: (i: number[]) => void,
  setIsPriceRangeChanged: (i: boolean) => void,
}

export interface ICatalogFilterDesktopProps {
  spinner: boolean
  applyFilters: () => void
  priceRange: number[],
  setPriceRange: (i: number[]) => void,
  setIsPriceRangeChanged: (i: boolean) => void,
  resetFilterBtnDisabled: boolean,
  resetFilters: () => void
}


