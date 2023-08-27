import {useMediaQuery} from '../../../hooks/useMediaQuery';
import {IFilterManufacturerAccordionProps} from '../../../types/catalog';
import {useStore} from 'effector-react';
import {$mode} from '../../../context/mode';
import styles from '../../../styles/catalog/index.module.scss';
import {Accordion} from '../../elements/Accordion/Accordion';
import {FilterCheckboxItem} from './FilterCheckboxItem';


export const FilterManufacturerAccordion = ({manufacturerList, setManufacturer, title, updateManufacturer}: IFilterManufacturerAccordionProps) => {

  const isMobile = useMediaQuery(820)

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const chooseAllManufacturers = () => {
    setManufacturer(manufacturerList.map((i) => ({...i, checked: true})))
  }


  return (
    <Accordion
      title={title}
      titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
      arrowOpenClass={styles.open}
      isMobileForFilters={isMobile}
      hideArrowClass={isMobile ? styles.hide_arrow : ''}
    >
      <div className={styles.filters__manufacturet__inner}>
        <button className={styles.filters__manufacturer__select_all} onClick={chooseAllManufacturers}>
          Выбрать всё
        </button>
        <ul className={styles.filters__manufacturer__list}>
          {manufacturerList.map((i) => (
            <FilterCheckboxItem
            id={i.id}
            checked={i.checked}
            title={i.title}
            event={updateManufacturer}
            key={i.id}
            />
          ))}
        </ul>
        <div style={{height: 24}}/>
      </div>
    </Accordion>
  )
}
