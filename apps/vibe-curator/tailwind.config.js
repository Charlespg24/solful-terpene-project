/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand colors
        forest: {
          50: '#f0f5f1',
          100: '#dce8de',
          200: '#bcd4c0',
          300: '#91b898',
          400: '#6b9b75',
          500: '#2D5A3D',
          600: '#284f36',
          700: '#22412d',
          800: '#1c3525',
          900: '#172b1e',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e6ece6',
          200: '#cfdacf',
          300: '#afc2af',
          400: '#87A878',
          500: '#6b8e5b',
          600: '#567248',
          700: '#455c3a',
          800: '#394a31',
          900: '#303e2a',
        },
        cream: {
          50: '#FDFCFA',
          100: '#F5F2EB',
          200: '#ebe5d9',
          300: '#ddd4c2',
          400: '#c9bca3',
          500: '#b5a487',
        },
        gold: {
          50: '#fbf8f0',
          100: '#f5edd8',
          200: '#ead9af',
          300: '#dcc07e',
          400: '#C4A962',
          500: '#b08d3e',
          600: '#957131',
          700: '#78572a',
          800: '#634728',
          900: '#533c24',
        },
        charcoal: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#2C2C2C',
        },
        // Vibe category colors
        vibe: {
          rest: '#6B5B7A',
          relax: '#8B7355',
          drift: '#5C7B8A',
          social: '#C4A962',
          focus: '#6B8E6B',
          uplift: '#D4845C',
          energy: '#9C6B7D',
          create: '#7A6B8E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-warm': 'linear-gradient(135deg, #F5F2EB 0%, #ebe5d9 100%)',
      }
    },
  },
  plugins: [],
}
