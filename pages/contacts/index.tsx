import Head from 'next/head'

import {Layout} from '../../components/layout/Layout';
import {ContactsPage} from '../../components/templates/ContactsPage/ContactsPage';
import React from 'react';
import {Breadcrumbs} from '../../components/modules/Breadcrumbs/Breadcrumbs';

export default function Contacts() {

  const getDefaultTextGenerator = React.useCallback(() => 'Контакты', [])
  const getTextGenerator = React.useCallback((param: string) => ({}[param]), []);


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
          <Breadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
          />
          <ContactsPage/>
          <div className={'overlay'}/>
        </main>
      </Layout>
    </>
  )
}

