var config = require('./config')
 , file_details = require('./get_file_details')
 , read = require('./read_css')
 , Build = require('./build_folder')
var Watch = require('@djforth/ap_utils').watcher;

function processCSS(name, path, cb){
  if (name.match(/^_/)){
    Build();
  } else {
    var details = file_details(path, name);
    read(details, cb);
  }
}

module.exports = function(cb){
  var watcher = Watch(config.get('input'));
  watcher.onAdd(function(name, path){
    if (!name.match(/^_/)){
      Build();
    }
  })
  .addChange(function(name, path){
    processCSS(name, path, cb);
  });
};

