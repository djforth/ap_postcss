var fs       = require('fs')
 , PostCSS = require('../plugin/postcss_build');

module.exports = function(file, cb){
  fs.readFile(file, (err, data) => {
    if (err) throw err;
    PostCSS(data.toString(), file.name, file.map, cb);
  });
}