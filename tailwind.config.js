import defaultTheme from 'tailwindcss/defaultTheme'
import forms from '@tailwindcss/forms'

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        principal: ["Urbanist", defaultTheme.fontFamily.sans],
        titulares: ["Cinzel", defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "fondo-fruta": "url('/img/fondo_fruta_vegetales.jpg')",
      }
    },
  },
  plugins: [forms],
}
