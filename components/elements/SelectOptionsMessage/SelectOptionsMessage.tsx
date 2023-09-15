import {NoticeProps,  GroupBase, components} from 'react-select';
import {IOption} from '../../../types/common';
import React from 'react';
import spinnerStyles from '../../../styles/spinner/index.module.scss'


export const NoOptionsMessage = (props: NoticeProps<IOption, boolean, GroupBase<IOption>>) => (
  <components.NoOptionsMessage {...props}>
    <span>Ничего не найдено</span>
  </components.NoOptionsMessage>
)

export const NoOptionsSpinner = (props: NoticeProps<IOption, boolean, GroupBase<IOption>>) => (
  <components.NoOptionsMessage {...props}>
    <span className={spinnerStyles.spinner} style={{top: '5px', left: '48%', width: 25, height: 25}}/>
  </components.NoOptionsMessage>
)
