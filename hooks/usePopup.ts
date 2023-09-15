import React from 'react';
import {removeClassNamesForOverlayAndBody, toggleClassNamesForOverlayAndBody} from '../utils/common';
import {setSearchZIndex} from '../context/header';



export const usePopup = () => {
  const [open, setOpen] = React.useState(false)


  const toggleOpen = () => {
    window.scroll(0,0)
    toggleClassNamesForOverlayAndBody()
    setOpen(!open)
  }

  const closePopup = () => {
    removeClassNamesForOverlayAndBody()
    setOpen(false)
    setSearchZIndex(1)
  }

  React.useEffect(() => {
    const overlay = document.querySelector('.overlay')

    overlay?.addEventListener('click', closePopup)

    return () => overlay?.removeEventListener('click', closePopup)

  }, [open])


  return {toggleOpen, open, setOpen, closePopup}

}
