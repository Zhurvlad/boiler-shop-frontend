import {useStore} from 'effector-react';
import {$mode} from '../../../context/mode';
import React, {useState} from 'react';
import {IOption, SelectOptionType} from '../../../types/common';
import Select from 'react-select';

import {createSelectOption} from '../../../utils/common';
import {controlStyles, menuStyles, selectStyles} from '../../../styles/catalog/select';
import {optionStyles} from '../../../styles/searchInput/index';
import {categoriesOptions} from '../../../utils/selectContents';
import {
  $boilerParts,
  setBoilerPartsByPopularityFirst,
  setBoilerPartsCheapFirst,
  setBoilerPartsExpensiveFirst
} from '../../../context/boilerParts';
import {useRouter} from 'next/router';
import {setTimeout} from 'timers';


export const FilterSelect = ({setSpinner}: (a: boolean) => void) => {

  const mode = useStore($mode)
  const boilerParts = useStore($boilerParts)
  const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null)
  const router = useRouter()


  React.useEffect(() => {
    if(boilerParts.rows){
     switch (router.query.first) {
       case 'cheap':
         updateCategoryOption('Сначала дешевые')
         setBoilerPartsCheapFirst()
         break

       case 'expensive':
         updateCategoryOption('Сначала дорогие')
         setBoilerPartsExpensiveFirst()

         break
       case 'popular':
         updateCategoryOption('По популярности')
         setBoilerPartsByPopularityFirst()
         break
       default:
         updateCategoryOption('Сначала дешевые')
         setBoilerPartsCheapFirst()
         break
     }
   }

  }, [boilerParts.rows, router.query.first])


  const updateCategoryOption = (value: string) => {
    setCategoryOption({value, label: value})
  }

  const updateRoteParam = (first: string) => (
    router.push(
      {
        query: {
          ...router.query,
          first,
        },
      },
      undefined,
      {shallow: true}
    ))

  const handleCategoryOptionChange = (selectedOption: SelectOptionType) => {
    setSpinner(true)
    setCategoryOption(selectedOption)
    switch ((selectedOption as IOption).value) {
      case 'Сначала дешевые':
        setBoilerPartsCheapFirst()
        updateRoteParam('cheap')
        break

      case 'Сначала дорогие':
        setBoilerPartsExpensiveFirst()
        updateRoteParam('expensive')
        break
      case 'По популярности':
        setBoilerPartsByPopularityFirst()
        updateRoteParam('popular')
        break
    }

    setTimeout(() => setSpinner(false), 1000)
  }

  return (
    <Select
      placeholder={'Поиск...'}
      value={categoryOption || createSelectOption('Сначала дешевые')}
      onChange={handleCategoryOptionChange}
      styles={{
        ...selectStyles,
        control: (defaultStyles) => ({
          ...controlStyles(defaultStyles, mode),
        }),
        input: (defaultStyles) => ({
          ...defaultStyles,
          color: mode === 'dark' ? '#f2f2f2' : '#222222'
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles, mode)
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode)
        })
      }}
      isSearchable={false}
      options={categoriesOptions}
    />
  )
}
