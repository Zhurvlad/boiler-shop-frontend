import {useMediaQuery} from '../../../hooks/useMediaQuery';
import {CatalogFiltersDesktop} from './CatalogFiltersDesktop';
import {ICatalogFiltersProps} from '../../../types/catalog';
import React from 'react';
import {toast} from 'react-toastify';
import {useStore} from 'effector-react';
import {$boilerManufacturers, $partsManufacturers} from '../../../context/boilerParts';

export const CatalogFilters = ({priceRange, setPriceRange, setIsPriceRangeChanged, resetFilterBtnDisabled, resetFilters, isPriceRangeChanged}: ICatalogFiltersProps) => {
  const isMobile = useMediaQuery(820)
  const [spinner, setSpinner] = React.useState(false)

  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)


  const applyFilters = async () => {
    try {
      setSpinner(true)
      const priceFrom = Math.ceil(priceRange[0])
      const priceTo = Math.ceil(priceRange[1])
      const priceQuery = isPriceRangeChanged ? `&priceFrom=${priceFrom}&priceTo=${priceTo}` : ''
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

        />}
    </>
  )
}
