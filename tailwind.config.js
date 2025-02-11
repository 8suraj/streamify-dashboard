/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Work Sans', 'Arial', 'sans-serif'], // Adding DIN Pro as the default sans font
      },
    },

  },
  plugins: [],
}

