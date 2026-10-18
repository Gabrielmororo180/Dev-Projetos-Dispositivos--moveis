/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Cores semânticas do FinPulse, baseadas no protótipo (docs/prototipo_telas.png)
      colors: {
        brand: {
          DEFAULT: '#059669', // emerald-600
          dark: '#047857', // emerald-700
          light: '#d1fae5', // emerald-100
        },
        income: '#059669', // emerald-600
        expense: '#e11d48', // rose-600
        warning: '#f59e0b', // amber-500
      },
    },
  },
  plugins: [],
};
