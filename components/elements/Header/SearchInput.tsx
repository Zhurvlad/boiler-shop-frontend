import {useStore} from 'effector-react';
import {$mode} from '../../../context/mode';
import React, {useState} from 'react';
import {SelectOptionType} from '../../../utils/common';
import Select from 'react-select';
import {controlStyles, inputStyles, menuStyles, optionStyles} from '../../../styles/searchInput/index';
import {defaultStyles} from 'react-select/dist/declarations/src/styles';


export const SearchInput = () => {

  const mode = useStore($mode)
  const [searchOption, setSearchOption] = useState<SelectOptionType>(null)

  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    setSearchOption(selectedOption)
  }

  return (
    <Select
    placeholder={'Поиск...'}
    value={searchOption}
    onChange={handleSearchOptionChange}
    styles={{
      ...inputStyles,
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
    isClearable={true}
    openMenuOnClick={false}
    options = {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((item) => ({value: item, label: item}))}
    />
  )
}
