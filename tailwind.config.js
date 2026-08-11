/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'pretendard-regular': ['Pretendard-Regular'],
        'pretendard-medium': ['Pretendard-Medium'],
        'pretendard-semibold': ['Pretendard-SemiBold'],
      },
      fontSize: {
        'main-title': ['22px', { lineHeight: '32px' }],
        sub1: ['14px', { lineHeight: '20px' }],
        body: ['11px', { lineHeight: '13px' }],
      },
      colors: {
        ruon: {
          logo: '#ECEADB',
          bg1: '#945C2D',
          bg2: '#FBF9F7',
          main1: '#945C2D',
          sub1: '#BE9D82',
          sub2: '#FFF9F1',
          white: '#FFFFFF',
          line: '#E8D9CB',
          text: '#965326',
          muted: '#B99B83',
          cardText: '#A97550',
          cardSubtext: '#B9A18F',
        },
      },
    },
  },
  plugins: [],
};
