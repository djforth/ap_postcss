var path = require('path');

var utils  = require('@djforth/ap_utils').config;

var defaults = {
  input: path.resolve('app/assets_uncompiled/stylesheets')
  , output: path.resolve('public/assets')
  ,  ext: [
    '*.css', '*.css.map', '*.gz'
  ]
  , plugins: [
    'precss'
    , 'postcss-asset-url-rails'
    , 'css-mqpacker'
    , 'postcss-merge-longhand'
    , 'postcss-merge-rules'
    , 'autoprefixer'
    , 'cssnano'
    , 'css-mqpacker'
  ]
  , use: []
};

var config = utils(defaults, 'stylesheets');

module.exports = config;
