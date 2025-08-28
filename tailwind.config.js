/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'black': '#000000',
        'white': '#FFFFFF',
        'gray': '#666666',
        'light-gray': '#FAFAFA',
      }
    },
  },
  plugins: [],
}