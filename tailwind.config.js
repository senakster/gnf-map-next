/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#1db954',
      },
      green: {
        DEFAULT:'#1db954',
      },
      transparent: '#FFFFFF00',
      black: '#000000',
      white: '#FFFFFF'
    },
    extend: {

    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}