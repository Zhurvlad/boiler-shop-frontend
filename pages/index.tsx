import Head from 'next/head'
import {AuthPage} from '../components/templates/AuthPage/AuthPage';
import {useRedirectByUserCheck} from '../hooks/useRedirectByUserCheck';
/*import { attachLogger } from 'effector-logger';
import {useStore} from 'effector-react';
import {$mode} from '../context/mode';
import {fork} from 'effector';
import {$shoppingCart, scope} from '../context/shopping-cart';




attachLogger({scope});
attachLogger({
  name: 'my-cool-app',
});*/

export default function Auth() {

  const {shouldLoadContent} = useRedirectByUserCheck(true)



  return (
    <>
      <Head>
        <title>Акватермик  | {shouldLoadContent ? 'Авторизация' : ''}</title>
        <meta charSet='UTF-8'/>
        <meta httpEquiv='X-UA-Compatible' content='IE-edge'/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel={'icon'} type={'image/svg'} size={'32x32'} href={'/img/logo.svg'}/>
      </Head>
      {shouldLoadContent && <AuthPage/>}
    </>
  )
}


