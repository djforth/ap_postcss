var  _       = require('lodash')
  , path     = require('path')
  , postcss  = require('postcss');

var config   = require('./config');
var create   = require('@djforth/ap_utils').create;

function addPlugins(plugins){
  plugins = _.map(plugins, function(p){
    if (_.isString(p)) return require(p)();
    if (_.isArray(p)) return require(p[0])(p[1]);
    console.error(p + 'is not valid array or string');
  });

  return plugins;
}

function sourcemap_path(map){
  return '\r\r /*# sourceMappingURL=' + map + ' */';
}

function create_path(name){
  return path.resolve(config.get('output'), name);
}

module.exports = function(css, file, cb){
  var plugins = addPlugins(config.get('plugins'));
  var usePlugins = addPlugins(config.get('use'));
  var pc = postcss(plugins);
  _.forEach(usePlugins, function(pl){
    pc.use(pl());
  });

  pc.process(css, {
    from: file.fullPath
    , annotation: true
    , map: {inline: false}
    , parser: require('postcss-scss')
  })
  .then(function(post){
    post.warnings().forEach(function(warn){
      console.warn(warn.toString());
    });

    create.file(create_path(file.name + '.erb')
      , post.css.toString() + sourcemap_path(file.map)
    );

    if (post.map) create.file(create_path(file.map), post.map);

    if (_.isFunction(cb)) cb(file.name);
  })
  .catch((err)=>{console.error(err.stack);});
};
