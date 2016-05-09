var _           = require("lodash")
 , config       = require("../plugin/config")
 , file_details = require("../plugin/get_file_details")
 , read         = require("../plugin/read_css")
 , Watch        = require("@djforth/ap_utils").watcher;

function processCSS(name, path, cb){
  var details = file_details(path, name);
  read(details, cb);
}

module.exports = function(cb){
  var watcher = Watch(config.get('input'))
    .onAdd(function(name, path){
      processCSS(name, path, cb);
    })
    .addChange(function(name, path){
      processCSS(name, path, cb);
    });
}
