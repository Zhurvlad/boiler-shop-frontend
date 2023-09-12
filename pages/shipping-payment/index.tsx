import Head from 'next/head'

import {Layout} from '../../components/layout/Layout';
import {DashboardPage} from '../../components/templates/DashboardPage/DashboardPage';
import {useRedirectByUserCheck} from '../../hooks/useRedirectByUserCheck';
import {OrderPage} from '../../components/templates/OrderPage/OrderPage';
import {ShippingPayment} from '../../components/templates/ShippingPayment/ShippingPayment';

export default function ShoppingPayment() {


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
          <ShippingPayment/>
          <div className={'overlay'}/>
        </main>
      </Layout>
    </>
  )
}
