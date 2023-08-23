import {useStore} from 'effector-react';
import {$mode} from '../../../context/mode';
import React, {useState} from 'react';
import {SelectOptionType} from '../../../types/common';
import Select from 'react-select';

import {createSelectOption} from '../../../utils/common';
import {controlStyles, menuStyles, selectStyles} from '../../../styles/catalog/select';
import {optionStyles} from '../../../styles/searchInput/index';
import {categoriesOptions} from '../../../utils/selectContents';


export const FilterSelect = () => {

  const mode = useStore($mode)
  const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null)

  const handleCategoryOptionChange = (selectedOption: SelectOptionType) => {
    setCategoryOption(selectedOption)
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
      options = {categoriesOptions}
    />
  )
}
