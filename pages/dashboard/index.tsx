import Head from 'next/head'

import {Layout} from '../../components/layout/Layout';
import {DashboardPage} from '../../components/templates/DashboardPage/Dashboard';

export default function Dashboard() {


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta charSet='UTF-8'/>
        <meta httpEquiv='X-UA-Compatible' content='IE-edge'/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel={'icon'} type={'image/svg'} size={'32x32'} href={'/img/logo.svg'}/>
      </Head>
      <Layout>
        <main>
          <DashboardPage/>
          <div className={'overlay'}/>
        </main>
      </Layout>
    </>
  )
}
