import {createDomain} from 'effector';
import {IShoppingCartItem} from '../types/shoppingCart';
import {IBoilerParts} from '../types/boilerParts';

const boilerParts = createDomain()

export const setBoilerParts = boilerParts.createEvent<IBoilerParts>()


export const $boilerParts = boilerParts
  .createStore<IBoilerParts>({} as IBoilerParts)
  .on(setBoilerParts, (_, parts) => parts)
