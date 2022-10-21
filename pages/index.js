import Head from 'next/head'
import Script from 'next/script'
import Maptalks from '@components/Maptalks'
export default function Home() {
  return (
    <div className={``}>
      <Head>
        <title>Grønne Nabofællesskaber</title>
        <meta name="description" content="Grønne Nabofællesskaber" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={``}>
        <Maptalks />
      </main>
    </div>
  )
}
