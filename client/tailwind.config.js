module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3f42f7',
          glow: 'rgba(99, 102, 241, 0.5)',
        },
        secondary: {
          DEFAULT: '#a855f7',
        },
        accent: {
          DEFAULT: '#fa3e5d',
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.7)',
          border: 'rgba(255, 255, 255, 0.4)',
        }
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
