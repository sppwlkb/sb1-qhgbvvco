/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
      },
      letterSpacing: {
        'wider': '0.05em',
      },
      lineHeight: {
        'relaxed': '1.75',
      },
      backdropBlur: {
        'sm': '8px',
      },
    },
  },
  plugins: [],
};