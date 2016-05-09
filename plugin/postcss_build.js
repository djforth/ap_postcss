var  _       = require("lodash")
  , config   = require("./config")
  , create   = require('@djforth/ap_utils').create
  , postcss  = require('postcss');


function addPlugins(plugins){
  plugins = _.map(plugins, function(p){
    if(_.isString(p)) return require(p)();
    if(_.isArray(p)) return require(p[0])(p[1]);
    console.error(p+"is not valid array or string");
  });

  return plugins
}

module.exports = function(css, fileName, mapName, cb){
    var plugins = addPlugins(config.get('plugins'));
    var usePlugins = addPlugins(config.get('use'));
    var pc = postcss(plugins);
    _.forEach(usePlugins, function(pl){
      pc.use(pl())
    });

    pc.process(css, {from: fileName,
        to:fileName, annotation:true, map: { inline: false }})
      .then(function (post) {
        post.warnings().forEach(function (warn) {
            console.warn(warn.toString());
        });

        create.file(fileName, post.css.toString()+"\r\r /*# sourceMappingURL="+mapName+" */");

        if(post.map) create.file(fileName+".map", post.map);


        if(_.isFunction(cb)) cb(fileName);

    });

  }
