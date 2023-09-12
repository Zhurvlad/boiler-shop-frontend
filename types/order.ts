

export interface IOrderAccordionProps {
  setOrderIsReady: (i: boolean) => void,
  showdownIcon: boolean
}


export interface IMakePayFx {
  url: string,
  amount: number
}



export interface ICheckPayFx {
  url: string,
  paymentId: string
}
