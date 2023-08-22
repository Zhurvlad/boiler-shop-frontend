import {defaultStyles, StylesConfig} from 'react-select/dist/declarations/src/styles';
import {CSSObjectWithLabel, GroupBase, OptionProps} from 'react-select';
import {IOption} from '../../utils/common';


export const controlStyles = (defaultStyles: CSSObjectWithLabel, theme: string) => ({
  ...defaultStyles,
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: '1px solid #9e9e9e',
  height: '40px',
  boxShadow: 'none',
  borderRadius: '4px',
  '&:hover': {borderColor: '#9e9e9e'},
  '& .css-1dimb5e-singleValue': {color: theme === 'dark' ? '#f2f2f2' : '#222222'},
  borderRight: 'none',
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0
})

export const menuStyles = (defaultStyles: CSSObjectWithLabel, theme: string) => ({
  ...defaultStyles,
  boxShadow: '0 4px 20px rgb(0 0 0 / 7%)',
  borderRadius: '4px',
  height: 'auto',
  overflow: 'hidden',
  backgroundColor: theme === 'dark' ? '#222222' : '#f2f2f2',
  /*color: theme === 'dark' ? '#f2f2f2' : '#222222',
  '&:hover': {color: theme === 'dark' ? '#222222' : '#f2f2f2'},
  '&:target': {color: theme === 'dark' ? '#222222' : '#f2f2f2'},
  '& .css-1dimb5e-singleValue': {color: theme === 'dark' ? '#222222' : '#f2f2f2'},*/
  width: 'calc(100% + 40px)',
  minHeight: 30
})

export const optionStyles = (
  defaultStyles: CSSObjectWithLabel,
  state: OptionProps<IOption, boolean, GroupBase<IOption>>,
  theme: string) => {

  const backgroundHoverForLightMode = state.isSelected
    ? state.isSelected ? '#9e9e9e' : '#f2f2f2'
    : state.isSelected ? '#f2f2f2' : '#9e9e9e'

  const backgroundHoverForDarkMode = state.isSelected
    ? state.isSelected ? '#f2f2f2' : '#9e9e9e'
    : state.isSelected ? '#9e9e9e' : '#f2f2f2'

  const colorHoverForLightMode = state.isSelected
    ? state.isSelected ? '#9e9e9e' : '#f2f2f2'
    : state.isSelected ? '#f2f2f2' : '#9e9e9e'

  const colorHoverForDarkMode = state.isSelected
    ? state.isSelected ? '#9e9e9e' : '#f2f2f2'
    : state.isSelected ? '#f2f2f2' : '#9e9e9e'

  return {
    ...defaultStyles,
    cursor: 'pointer',
    padding: '6px 12px',
    margin: 0,
    '&:hover': {
      backgroundColor:
        theme === 'dark'
          ? backgroundHoverForDarkMode
          : backgroundHoverForLightMode,
      color:
        theme === 'dark'
          ? colorHoverForDarkMode
          : colorHoverForLightMode
    },
    backgroundColor:
      theme === 'dark'
        ? state.isSelected ? '#f2f2f2' : '#2d2d2d'
        : state.isSelected ? '#2d2d2d' : '#f2f2f2',
    color:
      theme === 'dark'
        ? state.isSelected ? '#222222' : '#f2f2f2'
        : state.isSelected ? '#f2f2f2' : '#222222',
  }

}


export const inputStyles: StylesConfig<IOption, boolean, GroupBase<IOption>> = {
  indicatorSeparator: () => ({border: 'none'}),
  dropdownIndicator: () => ({display: 'none'}),
  menuList: (defaultStyles) => ({
    ...defaultStyles,
    paddingTop: 0,
    paddingBottom:0,
    minHeight:30,
    '&::-webkit-scrollbar': {
      width: '8px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb' : {
      background: '#454545',
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: 'gray'
    }
  }),
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: '#b9babb'
  })
}