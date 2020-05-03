// tailwind.config.js
const { colors, fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      boxShadow: {
        md: '0 0 5px 0 rgba(0,0,0,0.15)', // containers
        lg: '0 2px 15px 0 rgba(0,0,0,0.15)', // search box
        b: '0 4px 4px -1px rgba(0,0,0,0.05)', // sticky table header
      },
      colors: {
        blue: {
          ...colors.blue,
          800: '#004b8d', // UNF blue
        },
      },
      flex: {
        '2': '2 2 0%',
      },
      fontFamily: {
        sans: ['Roboto', ...fontFamily.sans],
        'sans-round': ['Nunito', ...fontFamily.sans],
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'even', 'odd', 'hover', 'focus'],
    borderWidth: ['responsive', 'first', 'last'],
    padding: ['responsive', 'first', 'last'],
  }
};
