import '../styles/globals.css'
import '@styles/maptalks.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

export const getStaticPaths = ({ locales }) => {
  return {
    paths: [
      // if no `locale` is provided only the defaultLocale will be generated
      { params: { slug: 'en' }, locale: 'en-US' },
      { params: { slug: '' }, locale: 'da-DK' },
    ],
    fallback: true,
  }
}