/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        triage: {
          primary: '#005A9C', // deep ocean blue
          teal: '#0A6B6B',
          critical: '#D92D20',
          warning: '#F79009',
          info: '#16A34A',
          bg: '#F9FAFB',
          slateText: '#1F2937',
        }
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      }
    },
  },
  plugins: [],
};
