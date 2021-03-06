var _    = require('lodash')
  , es   = require('event-stream')
  , read = require('@djforth/ap_utils').read;

var config  = require('../plugin/config')
 , file_details = require('../plugin/get_file_details')
 , readCSS = require('../plugin/read_css');

module.exports = function(cb){
  var input = config.get('input');
  var css_list = read(input, '*.css');
  css_list.on('end', function(){
    if (_.isFunction(cb)){
      cb();
    }
  })
  .pipe(es.mapSync(function(file){
    if (file.name.match(/^_/)) return null;
    return file_details(file.fullPath, file.name);
  }))
  .pipe(es.through(function(file){
    if (file){
      var ps = es.pause();
      readCSS(file, function(){
        ps.resume();
      }.bind(this));
    }

    return file;
  }));
};
