import React, {useState} from 'react';
import type { AppProps } from 'next/app'
import {withHydrate} from 'effector-next';
import NextNProgress from 'nextjs-progressbar';
import '../styles/globals.css'
import {ToastContainer} from 'react-toastify';
import { attachLogger } from 'effector-logger';
import {fork} from 'effector';
import {$shoppingCart} from '../context/shopping-cart';

const enhance = withHydrate()






function App({ Component, pageProps }: AppProps) {

  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    setMounted(true)
  })

  return (
    mounted && <>
      <NextNProgress/>
      <Component {...pageProps}/>
     {/* <ToastContainer
        position="bottom-right"
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        limit={1}
        theme="light"
      />*/}
    </>
  )
}

export default enhance(App as React.FC<AppProps>)
