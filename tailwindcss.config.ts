import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#278783', // New primary color
        secondary: '#FFEBD0', // New secondary color
        accent: '#FF8552', // From original palette
        neutral: '#E6E6E6', // From original palette
        dark: '#1A1A1A', // From original palette
        white: '#FFFFFF', // From original palette
        legacyPrimary: '#85FFC7', // Original primary for backward compatibility
        legacySecondary: '#297373', // Original secondary for backward compatibility
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        sourcecodepro: ['Source Code Pro', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;