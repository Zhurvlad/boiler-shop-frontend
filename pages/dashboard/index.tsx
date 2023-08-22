import Head from 'next/head'

import {Layout} from '../../components/layout/Layout';
import {DashboardPage} from '../../components/templates/DashboardPage/Dashboard';
import {useRedirectByUserCheck} from '../../hooks/useRedirectByUserCheck';

export default function Dashboard() {

  const {shouldLoadContent} = useRedirectByUserCheck()


  return (
    <>
      <Head>
        <title>Акватермикс | {shouldLoadContent ? 'Главная' : ''}</title>
        <meta charSet='UTF-8'/>
        <meta httpEquiv='X-UA-Compatible' content='IE-edge'/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel={'icon'} type={'image/svg'} size={'32x32'} href={'/img/logo.svg'}/>
      </Head>
      {shouldLoadContent
      &&
      <Layout>
        <main>
          <DashboardPage/>
          <div className={'overlay'}/>
        </main>
      </Layout>}
    </>
  )
}
