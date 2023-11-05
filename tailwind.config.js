/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');

export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          200: '#FF88FF',
          300: '#FF1ffe',
          400: '#ff00fe',
          500: '#e800e7',
        },

        secondary: {
          200: '#FFA93F',
          300: '#FF9B21',
          400: '#FE8C00',
          500: '#DC9000',
        },

        tertiary: {
          200: '#3FAEFF',
          300: '#20A1FF',
          400: '#0094FF',
          500: '#0081DF',
        },

        light: '#eee',
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
      },
    },
  },
  plugins: [],
});
