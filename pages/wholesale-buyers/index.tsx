import Head from 'next/head'
import { useCallback } from 'react'
import {Layout} from '../../components/layout/Layout';
import {ContactsPage} from '../../components/templates/ContactsPage/ContactsPage';


function WholesaleBuyers() {
  const getDefaultTextGenerator = useCallback(() => 'Оптовым покупателям', [])
  const getTextGenerator = useCallback((param: string) => ({}[param]), [])

  return (
    <>
      <Head>
        <title>Аква Термикс | Оптовым покупателям</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      <Layout>
        <main>
          <ContactsPage isWholesaleBuyersPage={true} />
        </main>
        <div className="overlay" />
      </Layout>
    </>
  )
}

export default WholesaleBuyers
