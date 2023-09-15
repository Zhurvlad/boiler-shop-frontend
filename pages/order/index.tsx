import Head from 'next/head'

import {Layout} from '../../components/layout/Layout';
import {DashboardPage} from '../../components/templates/DashboardPage/DashboardPage';
import {useRedirectByUserCheck} from '../../hooks/useRedirectByUserCheck';
import {OrderPage} from '../../components/templates/OrderPage/OrderPage';
import {Breadcrumbs} from '../../components/modules/Breadcrumbs/Breadcrumbs';
import React, {useCallback} from 'react';

export default function Order() {

  const {shouldLoadContent} = useRedirectByUserCheck()


  const getDefaultTextGenerator = useCallback(() => 'Оформление заказа', [])
  const getTextGenerator = useCallback((param: string) => ({}[param]), [])


  return (
    <>
      <Head>
        <title>Акватермикс | {shouldLoadContent ? 'Оформление заказа' : ''}</title>
        <meta charSet='UTF-8'/>
        <meta httpEquiv='X-UA-Compatible' content='IE-edge'/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel={'icon'} type={'image/svg'} size={'32x32'} href={'/img/logo.svg'}/>
      </Head>
      {shouldLoadContent
      &&
      <Layout>
        <main>
          <Breadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
          />
          <OrderPage/>
          <div className={'overlay'}/>
        </main>
      </Layout>}
    </>
  )
}
