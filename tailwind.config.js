/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-black': '#151515', // Custom color
        'custom-black-2': '#282424', // Custom color

      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

