import Head from 'next/head'
import {Layout} from '../../components/layout/Layout';
import AboutPage from '../../components/templates/AboutPage/AboutPage';

export default function About() {


  return (
    <>
      <Head>
        <title>Акватермикс | О компании</title>
        <meta charSet='UTF-8'/>
        <meta httpEquiv='X-UA-Compatible' content='IE-edge'/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel={'icon'} type={'image/svg'} size={'32x32'} href={'/img/logo.svg'}/>
      </Head>

      <Layout>
        <main>
          <AboutPage/>
          <div className={'overlay'}/>
        </main>
      </Layout>
    </>
  )
}
