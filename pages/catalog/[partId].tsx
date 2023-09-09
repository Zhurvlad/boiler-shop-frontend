import Head from 'next/head'

import {Layout} from '../../components/layout/Layout';
import {useRedirectByUserCheck} from '../../hooks/useRedirectByUserCheck';
import {IQueryParams} from '../../types/catalog';
import {useStore} from 'effector-react';
import {$boilerPart, setBoilerPart} from '../../context/boilerPart';
import {getBoilerPartFx} from '../../app/api/boilerParts';
import {toast} from 'react-toastify';
import React, {useState} from 'react';
import {PartPage} from '../../components/templates/PartPage/PartPage';
import {useRouter} from 'next/router';
import {Custom404} from '../404';

export default function CatalogPartPage({query}: {query:IQueryParams }) {

  const {shouldLoadContent} = useRedirectByUserCheck()
  const boilerPart = useStore($boilerPart)
  const router = useRouter()
  const [error, setError] = useState(false)

  React.useEffect(() => {
    loadBoilerPart()
  }, [router.asPath])

  const loadBoilerPart = async () => {
    try {
      const data = await getBoilerPartFx(`/boiler-parts/find/${query.partId}`)

      if(!data) {
        setError(true)
        return
      }

      setBoilerPart(data)
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <>
      <Head>
        <title>Акватермикс | {shouldLoadContent ? boilerPart.name : ''}</title>
        <meta charSet='UTF-8'/>
        <meta httpEquiv='X-UA-Compatible' content='IE-edge'/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel={'icon'} type={'image/svg'} size={'32x32'} href={'/img/logo.svg'}/>
      </Head>
      {error
        ? <Custom404/>
        : shouldLoadContent
        &&
        <Layout>
          <main>
            <PartPage/>
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
