/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a3a5c',
        accent: '#e8421a',
        light: '#f4f7fb',
        dark: '#0d1f33',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
