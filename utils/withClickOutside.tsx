import React, {ForwardRefExoticComponent, MouseEvent, MutableRefObject, RefAttributes} from 'react';

import {IWrappedComponentProps} from '../types/common';



export function withClickOutside(WrappedComponent: ForwardRefExoticComponent<IWrappedComponentProps & RefAttributes<HTMLDivElement>>) {

  const Component = () => {
    const [opened, setOpened] = React.useState(false)
    const ref = React.useRef() as MutableRefObject<HTMLDivElement>

    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if(!ref.current.contains(e.target as HTMLDivElement)){
          setOpened(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)

      return () => document.removeEventListener('mousedown', handleClickOutside)

    }, [ref])

    return <WrappedComponent opened={opened} setOpened={setOpened} ref={ref}/>
  }

  return Component
}
