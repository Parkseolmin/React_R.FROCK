/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        banner: `url('/public/image/bannerImg.jpg')`,
      },
      fontFamily: {
        Playfair: ['Playfair Display', 'serif'],
        Raleway: ['Raleway', 'sans-serif'],
        Naum: ['Nanum Gothic', 'sans-serif'],
        Dongle: ['Dongle', 'sans-serif'],
        NotoSans: ['Noto Sans KR', 'sans-serif'],
      },
      screens: {
        tablet: { max: '639px' },
      },
    },
  },
  plugins: [],
};
