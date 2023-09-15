module.exports = {
  plugins: {
    'postcss-preset-env': {
      browsers: 'last 2 versions',
    },
    'postcss-import': {},
    cssnano: {},
    tailwindcss: {},
    autoprefixer: {},
    'tailwindcss/nesting': {},
  },
}
