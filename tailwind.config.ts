/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  darkMode: 'class',
  theme: {
    borderRadius: {
      none: '0',
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      full: '9999px',
    },
    screens: {
      sm: '600px',
      md: '870px',
      lg: '1024px',
      xl: '1440px',
    },
    extends: {},
  },
};
