/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Concrete ground — warm light greys
        paper: '#F3F1EB',
        ink: '#1A1916',
        concrete: {
          50: '#F6F4EF',
          100: '#EEECE5',
          200: '#E1DED4',
          300: '#CFCAC0',
          400: '#A9A49A',
          500: '#8A857B',
          600: '#5F5B54',
        },
        // Rebar safety-orange is the single accent
        rebar: {
          50: '#FEF1EA',
          100: '#FCE0CF',
          300: '#F29A6B',
          DEFAULT: '#E6530F',
          dark: '#C0440A',
          ink: '#8A3107',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widestx: '0.28em',
      },
      // Ruling-engine hairline grid grammar
      backgroundImage: {
        'plan-square': 'repeating-linear-gradient(0deg, #DEDBD0 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, #DEDBD0 0 1px, transparent 1px 40px)',
      },
    },
  },
  plugins: [],
}