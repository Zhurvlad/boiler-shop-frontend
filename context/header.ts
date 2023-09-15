import {createDomain} from 'effector-next';


const header = createDomain()

export const setSearchZIndex = header.createEvent<number>()

export const $setSearchZIndex = header.createStore<number>(1).on(setSearchZIndex, (_, zIndex) => zIndex)
