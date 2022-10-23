import Head from 'next/head'
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "@lib/sanity";
import { groq } from "next-sanity";
import Maptalks from '@components/Maptalks'
import { geoJSON_URL } from '../config/'
import LanguageSwitcher from '@components/LanguageSwitcher';

type Props = {
  data: GeoJSON.FeatureCollection
}

export default function Home(props: Props) {
  const {data} = props
  const {locale} = useRouter()
  return (
    <div className={``}>
      <Head>
        <title>Grønne Nabofællesskaber</title>
        <meta name="description" content="Grønne Nabofællesskaber" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={``}>
        <LanguageSwitcher />
        <Maptalks {...{data}}/>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(geoJSON_URL)
  const data = await res.json()
  return {
    props: {
      data,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    // revalidate: 10, // In seconds
  }
}