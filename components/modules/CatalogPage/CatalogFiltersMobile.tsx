import {useStore} from 'effector-react';

import {$mode} from '../../../context/mode';

import {ICatalogFiltersMobileProps} from '../../../types/catalog';

import styles from '../../../styles/catalog/index.module.scss';
import spinnerStyles from '../../../styles/spinner/index.module.scss'
import {FiltersPopupTop} from './FiltersPopupTop';
import {FiltersPopup} from './FiltersPopup';
import {
  $boilerManufacturers,
  $partsManufacturers,
  setBoilerManufacturers, setPartsManufacturers,
  updateBoilerManufacturers, updatePartsManufacturers
} from '../../../context/boilerParts';
import React from 'react';
import {Accordion} from '../../elements/Accordion/Accordion';
import {PriceRange} from './PriceRange';
import {useMediaQuery} from '../../../hooks/useMediaQuery';


export const CatalogFiltersMobile = ({
                                       spinner, resetFilterBtnDisabled, resetFilters,
                                       closePopup, applyFilters, filtersMobileOpen, priceRange,
                                       setPriceRange,
                                       setIsPriceRangeChanged

                                     }: ICatalogFiltersMobileProps) => {

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)

  const [openBoilers, setOpenBoilers] = React.useState(false)
  const [openParts, setOpenParts] = React.useState(false)

  const handleOpenBoilers = () => setOpenBoilers(true)
  const handleCloseBoilers = () => setOpenBoilers(false)
  const handleOpenParts = () => setOpenParts(true)
  const handleCloseParts = () => setOpenParts(false)


  const isAnyBoilerManufacturerChecked = boilerManufacturers.some((i) => i.checked)
  const isAnyPartsManufacturerChecked = partsManufacturers.some((i) => i.checked)

  const resetAllBoilerManufacturers = () => {
    setBoilerManufacturers(boilerManufacturers.map((i) => ({...i, checked: false})))
  }

  const resetAllPartsManufacturers = () => {
    setPartsManufacturers(partsManufacturers.map((i) => ({...i, checked: false})))
  }

  const applyFiltersAndClosePopup = () => {
    applyFilters()
    closePopup()
  }

  const isMobile = useMediaQuery(820)

  return (
    <div
      className={`${styles.catalog__bottom__filters} ${darkModeClass} ${
        filtersMobileOpen ? styles.open : ''
      }`}
    >
      <div className={styles.catalog__bottom__filters__inner}>
        <FiltersPopupTop
          resetBtnText="Сбросить все"
          title="Фильтры"
          resetFilters={resetFilters}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          closePopup={closePopup}
        />
        <div className={styles.filters__boiler_manufacturers}>
          <button
            className={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            onClick={handleOpenBoilers}
          >
            Производитель котлов
          </button>
          <FiltersPopup
            title="Производитель котлов"
            resetFilterBtnDisabled={!isAnyBoilerManufacturerChecked}
            updateManufacturer={updateBoilerManufacturers}
            setManufacturer={setBoilerManufacturers}
            applyFilters={applyFiltersAndClosePopup}
            manufacturerList={boilerManufacturers}
            resetAllManufacturers={resetAllBoilerManufacturers}
            handleClosePopup={handleCloseBoilers}
            openPopup={openBoilers}
          />
        </div>
        <div className={styles.filters__boiler_manufacturers}>
          <button
            className={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            onClick={handleOpenParts}
          >
            Производитель запчастей
          </button>
          <FiltersPopup
            title="Производитель запчастей"
            resetFilterBtnDisabled={!isAnyPartsManufacturerChecked}
            updateManufacturer={updatePartsManufacturers}
            setManufacturer={setPartsManufacturers}
            applyFilters={applyFiltersAndClosePopup}
            manufacturerList={partsManufacturers}
            resetAllManufacturers={resetAllPartsManufacturers}
            handleClosePopup={handleCloseParts}
            openPopup={openParts}
          />
        </div>
        <div className={styles.filters__price}>
          <Accordion
            title="Цена"
            titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            hideArrowClass={styles.hide_arrow}
            isMobileForFilters={isMobile}
          >
            <div className={styles.filters__manufacturer__inner}>
              <PriceRange
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                setIsPriceRangeChanged={setIsPriceRangeChanged}
              />
              <div style={{height: 24}}/>
            </div>
          </Accordion>
        </div>
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          onClick={applyFiltersAndClosePopup}
          disabled={resetFilterBtnDisabled}
        >
          {spinner ? (
            <span
              className={spinnerStyles.spinner}
              style={{top: 6, left: '47%'}}
            />
          ) : (
            'Показать'
          )}
        </button>
      </div>
    </div>
  )
}
