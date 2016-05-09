var _    = require("lodash")
  , utils  = require("@djforth/ap_utils").config
  , path = require("path")


function setPaths(key, def){
  return function(path, obj){
    obj[key] =(_.isUndefined(path)) ? def : path;
    return obj;
  }
}

var defaults = {
      input    : path.resolve("app/assets_uncompiled/stylesheets")
    , output   : path.resolve("public/assets")
  ,  ext        : [
     '*.css', '*.css.map', "*.gz"
  ]
  , plugins:[
    'css-mqpacker'
    , 'postcss-merge-longhand'
    , 'postcss-merge-rules'
    , 'postcss-cssnext'
    , 'cssnano'
  ]
  , use: ['postcss-import']
}

var config = utils(defaults, "stylesheets")


module.exports = config;