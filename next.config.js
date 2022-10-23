/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  i18n: {
    locales: ['da-DK','en-US'],
    defaultLocale: 'da-DK',
  },  
  ...nextConfig
}
