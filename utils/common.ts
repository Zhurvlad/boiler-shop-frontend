import {MultiValue, SingleValue} from 'react-select';

export const getWindowWidth = () => {
  const { innerWidth: windowWidth } =
    typeof window !== 'undefined' ? window : { innerWidth: 0 }

  return { windowWidth }
}

export interface IOption {
  value: string | number,
  label: string | number
}


export type SelectOptionType = MultiValue<IOption> | SingleValue<IOption> | null
