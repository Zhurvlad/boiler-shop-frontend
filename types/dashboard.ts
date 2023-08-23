import {IBoilerParts} from './boilerParts';


export interface IDashboardSlider {
  items: IBoilerParts[],
  spinner: boolean,
  goToPartPage?: boolean
}


export interface ICartAlertProps {
  count: number,
  closeAlert: VoidFunction
}
