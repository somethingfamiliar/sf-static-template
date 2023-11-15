// postcss.config.js

const path = require('path')

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-custom-media')({
      importFrom: 'src/assets/css/global/queries.css',
    }),
    require('postcss-preset-env')({
      stage: 1,
    }),
  ],
}
