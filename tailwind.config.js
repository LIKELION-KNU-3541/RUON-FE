/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ruon: {
          darkBg: '#2B1E14',
          darkCard: '#3B2B1E',
          darkBorder: '#4E3A2A',
          gold: '#E5A96A',
          amber: '#F4A261',
          creamBg: '#FDFBF7',
          creamCard: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
};
