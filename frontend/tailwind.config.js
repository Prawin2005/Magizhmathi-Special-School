/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Deep Teal (Primary brand color)
          royal: '#0D5C63',
          'royal-dark': '#073C41',
          'royal-light': '#187A84',

          // Soft Mint (Secondary accent color)
          sky: '#3DA392',
          'sky-dark': '#2B7A6D',
          'sky-light': '#74D2C1',
          'mint-soft': '#E6F7F3',

          // Ivory (Backgrounds & Sections)
          ice: '#FAF7F2',
          'ice-alt': '#F3ECE0',
          border: '#E6DFD1',

          // Warm Yellow (Highlights & Star Accents)
          gold: '#F3B336',
          'gold-light': '#FCD579',
          'gold-dark': '#D89417',

          dark: '#1C2826',
          muted: '#63706D',
        },
        // Direct named utilities for the new palette
        teal: {
          deep: '#0D5C63',
          dark: '#073C41',
          light: '#187A84',
        },
        mint: {
          soft: '#E6F7F3',
          DEFAULT: '#3DA392',
          dark: '#2B7A6D',
          light: '#74D2C1',
        },
        ivory: {
          DEFAULT: '#FAF7F2',
          light: '#FDFBF8',
          dark: '#F3ECE0',
          border: '#E6DFD1',
        },
        warmYellow: {
          DEFAULT: '#F3B336',
          light: '#FCD579',
          dark: '#D89417',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        sans: ['Nunito', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(13, 92, 99, 0.08)',
        'card': '0 10px 30px -4px rgba(13, 92, 99, 0.10)',
        'float': '0 20px 40px -6px rgba(13, 92, 99, 0.14)',
        'glow': '0 0 25px rgba(61, 163, 146, 0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
