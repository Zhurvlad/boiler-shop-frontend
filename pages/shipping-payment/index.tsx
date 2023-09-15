import Head from 'next/head'

import {Layout} from '../../components/layout/Layout';
import {ShippingPayment} from '../../components/templates/ShippingPayment/ShippingPayment';
import React, {useCallback} from 'react';
import {Breadcrumbs} from '../../components/modules/Breadcrumbs/Breadcrumbs';

export default function ShoppingPayment() {

  const getDefaultTextGenerator = useCallback(() => 'Доставка и оплата', [])
  const getTextGenerator = useCallback((param: string) => ({}[param]), [])

  return (
    <>
      <Head>
        <title>Акватермикс | Доставка и оплата</title>
        <meta charSet='UTF-8'/>
        <meta httpEquiv='X-UA-Compatible' content='IE-edge'/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel={'icon'} type={'image/svg'} size={'32x32'} href={'/img/logo.svg'}/>
      </Head>

      <Layout>
        <main>
          <Breadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
          />
          <ShippingPayment/>
          <div className={'overlay'}/>
        </main>
      </Layout>
    </>
  )
}
