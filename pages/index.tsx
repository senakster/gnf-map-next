import Head from 'next/head'
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "@lib/sanity";
import { groq } from "next-sanity";
import Maptalks from '@components/Maptalks'
import { geoJSON_URL } from '../config/'
import LanguageSwitcher from '@components/LanguageSwitcher';
import Modal from '@components/Modal';
import React, { useState } from 'react';
import { onlyUnique } from 'helpers';

type Props = {
  municipalities: GeoJSON.FeatureCollection,
  sanitizedMunicipalities: any,
  pageData: any[];
}

export default function Home(props: Props) {
  const {municipalities, pageData, sanitizedMunicipalities} = props
  console.log(municipalities, sanitizedMunicipalities)
  const [modalOpen, setModalOpen] = useState<false | {municipality?: string}>(false)
  const toggle = (params?: false | {municipality?: string}) => {
    setModalOpen(params || false)
  }
  // const {locale} = useRouter()
  return (
    <div className={``}>
      <Head>
        <title>Grønne Nabofællesskaber</title>
        <meta name="description" content="Grønne Nabofællesskaber" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={``}>
        <LanguageSwitcher />
        <Maptalks {...{municipalities, pageData, toggle, modalOpen}}/>
        <Modal {...{toggle, modalOpen, pageData}}/>
      </main>
    </div>
  )
}

export async function getStaticProps(props: any) {
  const {preview} = props
  // GEOJSON MUNICIPALITIES
  const res = await fetch(geoJSON_URL)
  const municipalities = await res.json()
  const municipalityNames = municipalities.features.map((f: Municipality) => f.properties?.label_dk).filter(onlyUnique)
  const sanitizedMunicipalities = municipalityNames.map((n: string) => (
    { title: n,
      geometry: {coordinates: municipalities.features.filter((m: Municipality) => m.properties?.label_dk === n).map((m: Municipality) => m.geometry.coordinates)},
      properties: {label_dk: n}
    }))
  // const sanitizedMunicipalities = municipalities.features
  // GNF GROUPS
  const query = `*[_type == "municipality"]{
    title,
    "groups": *[_type == 'group' && references(^._id)]{
      title,
      facebook,
      type,
      municipality->{
        title
      }
    }
  }`
  const pageData = await getClient(preview).fetch(query)

  return {
    props: {
      // municipalities: { features: sanitizedMunicipalities },
      municipalities,
      pageData,
      sanitizedMunicipalities: { features: sanitizedMunicipalities }
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    // revalidate: 10, // In seconds
  }
}