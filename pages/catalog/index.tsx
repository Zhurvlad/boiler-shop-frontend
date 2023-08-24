import Head from 'next/head'

import {Layout} from '../../components/layout/Layout';
import {DashboardPage} from '../../components/templates/DashboardPage/Dashboard';
import {useRedirectByUserCheck} from '../../hooks/useRedirectByUserCheck';
import {CatalogPage} from '../../components/templates/CatalogPage/CatalogPage';
import {IQueryParams} from '../../types/catalog';

export default function Catalog({query}: {query:IQueryParams }) {

  const {shouldLoadContent} = useRedirectByUserCheck()


  return (
    <>
      <Head>
        <title>Акватермикс | {shouldLoadContent ? 'Каталог' : ''}</title>
        <meta charSet='UTF-8'/>
        <meta httpEquiv='X-UA-Compatible' content='IE-edge'/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel={'icon'} type={'image/svg'} size={'32x32'} href={'/img/logo.svg'}/>
      </Head>
      {shouldLoadContent
      &&
      <Layout>
        <main>
          <CatalogPage query={query}/>
          <div className={'overlay'}/>
        </main>
      </Layout>}
    </>
  )
}

export function getServerSideProps(context : {query : IQueryParams}) {
  return {
    props: {query : {...context.query}}
  }
}
