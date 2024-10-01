/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{css,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionProperty: {
        transform: 'transform',
      },
    },
  },
  variants: {
    extends: {
      translate: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [],
};
