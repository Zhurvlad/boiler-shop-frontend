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
  priceTo: string,
  partId: string
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

interface ICatalogBaseTypes {
  priceRange: number[],
  setPriceRange: (i: number[]) => void,
  setIsPriceRangeChanged: (i: boolean) => void,
  resetFilterBtnDisabled: boolean,
  resetFilters: () => void
}

export interface ICatalogFiltersProps extends ICatalogBaseTypes {
  isPriceRangeChanged: boolean
  currentPage: number
  setFilteredInQuery: (i: boolean) => void
  closePopup: () => void
  filtersMobileOpen: boolean

}

export interface IPriceRange {
  priceRange: number[],
  setPriceRange: (i: number[]) => void,
  setIsPriceRangeChanged: (i: boolean) => void,
}

export interface ICatalogFilterDesktopProps extends ICatalogBaseTypes{
  spinner: boolean
  applyFilters: () => void

}

export interface ICatalogFiltersMobileProps extends ICatalogBaseTypes {
  spinner: boolean
  applyFilters: () => void
  closePopup: () => void
  filtersMobileOpen: boolean
}

export interface IFiltersPopupTop {
  resetFilterBtnDisabled: boolean,
  resetBtnText: string,
  title: string,
  resetFilters: () => void,
  closePopup: boolean
}

export interface IFiltersPopupProps extends IFilterManufacturerAccordionProps{
  resetFilterBtnDisabled: boolean,
  resetAllManufacturers: () => void,
  handleClosePopup: () => void,
  applyFilters: () => void,
  openPopup: boolean,
}


