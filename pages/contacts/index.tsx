import Head from 'next/head'

import {Layout} from '../../components/layout/Layout';
import {ContactsPage} from '../../components/templates/ContactsPage/ContactsPage';

export default function Contacts() {




  return (
    <>
      <Head>
        <title>Акватермикс | Контакты</title>
        <meta charSet='UTF-8'/>
        <meta httpEquiv='X-UA-Compatible' content='IE-edge'/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel={'icon'} type={'image/svg'} size={'32x32'} href={'/img/logo.svg'}/>
      </Head>
      <Layout>
        <main>
          <ContactsPage/>
          <div className={'overlay'}/>
        </main>
      </Layout>
    </>
  )
}

