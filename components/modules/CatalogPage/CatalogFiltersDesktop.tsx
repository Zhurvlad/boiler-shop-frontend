import {useStore} from 'effector-react';
import {$mode} from '../../../context/mode';
import styles from '../../../styles/catalog/index.module.scss';
import spinnerStyles from '../../../styles/spinner/index.module.scss';
import {
  $boilerManufacturers,
  $partsManufacturers,
  setBoilerManufacturers, setPartsManufacturers,
  updateBoilerManufacturers, updatePartsManufacturers
} from '../../../context/boilerParts';
import {FilterManufacturerAccordion} from './FilterManufacturerAccordion';
import {Accordion} from '../../elements/Accordion/Accordion';
import {PriceRange} from './PriceRange';
import {ICatalogFilterDesktopProps} from '../../../types/catalog';
import React from 'react';


export const CatalogFiltersDesktop = ({priceRange, setPriceRange, setIsPriceRangeChanged,
                                        resetFilterBtnDisabled, spinner, resetFilters}: ICatalogFilterDesktopProps) => {


  const mode = useStore($mode)
  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''


  return (
    <div className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>
      <h3 className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}>Фильтры</h3>
      <div className={styles.filters__boiler_manufacturers}>
        <FilterManufacturerAccordion
          manufacturerList={boilerManufacturers}
          title={'Производитель котлов'}
          updateManufacturer={updateBoilerManufacturers}
          setManufacturer={setBoilerManufacturers}
        />
        <div className={styles.filters__price}>
          <Accordion
            title={'Цена'}
            titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            arrowOpenClass={styles.open}>
            <div className={styles.filters__manufacturer__inner}>
              <PriceRange
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                setIsPriceRangeChanged={setIsPriceRangeChanged}
              />
              <div style={{ height: 24 }} />
            </div>

          </Accordion>
        </div>
        <div className={styles.filters__boiler_manufacturer}>
          <FilterManufacturerAccordion
            manufacturerList={partsManufacturers}
            title={'Производитель запчастей'}
            updateManufacturer={updatePartsManufacturers}
            setManufacturer={setPartsManufacturers}
          />
        </div>
        <div className={styles.filters__actions}>
          <button className={styles.filters__actions__show}
                  disabled={spinner || resetFilterBtnDisabled}>{spinner
            ? <span className={spinnerStyles.spinner} style={{top: 6, left: '47%'}}/>
            : 'Показать'} </button>
          <button onClick={resetFilters} className={styles.filters__actions__reset}
                  disabled={resetFilterBtnDisabled}>Сбросить</button>
        </div>
      </div>
    </div>
  )
}
