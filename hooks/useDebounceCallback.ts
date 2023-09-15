import React, {MutableRefObject, useRef} from 'react';
import {clearTimeout, setTimeout} from 'timers';


export const useDebounceCallback = (delay = 100) => {
  const ref = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

  React.useEffect(() => {
    clearTimeout(ref.current)
  }, [])

  return (callback: () => void) => {
    clearTimeout(ref.current)
    ref.current = setTimeout(callback, delay)
  }

}
