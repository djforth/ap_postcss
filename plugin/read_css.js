var fs = require('fs');
var PostCSS = require('../plugin/postcss_build');

module.exports = function(file, cb){
  fs.readFile(file.fullPath, function(err, data){
    if (err) throw err;
    PostCSS(data.toString(), file, cb);
  });
};
