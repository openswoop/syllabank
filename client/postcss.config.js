const purgecss = {
  // Specify the paths to all of the template files in your project
  content: [
    './pages/**/*.jsx',
    './pages/**/*.tsx',
    './components/**/*.jsx',
    './components/**/*.tsx',
  ],

  // Whitelist selectors to stop purgecss from removing them
  whitelist: ['html', 'body'],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
};

module.exports = {
  plugins: [
    'postcss-easy-import',
    'tailwindcss',
    'autoprefixer',
    [
      '@fullhuman/postcss-purgecss',
      process.env.NODE_ENV === 'production' ? purgecss : false,
    ],
  ],
};
