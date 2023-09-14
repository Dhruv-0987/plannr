/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "brand-green": '#373D20',
        'brand-light-green': '#6B8F71'
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        'lato': ['Lato', 'sans-serif']
      }
    },
  },
  plugins: [],
};
