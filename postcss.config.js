const tailwindcss = require('tailwindcss')
module.exports = {
  plugins: [
    require('postcss-easy-import'),
    tailwindcss('./js/tailwind.js'),
    require('autoprefixer')
  ]
}