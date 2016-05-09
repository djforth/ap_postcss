var path = require('path');

module.exports = function(fullPath, name){
  var ext = path.extname(name);
  if (ext !== '.css') return false;

  return {
    fullPath: fullPath
    , name: name
    , map: name + '.map'
  };
};
