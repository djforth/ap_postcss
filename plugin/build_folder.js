var _      = require("lodash")
 , config  = require("../plugin/config")
 , file_details = require("../plugin/get_file_details")
 , readCSS = require("../plugin/read_css")
 , read    = require("@djforth/ap_utils").read;

module.exports = function(cb, watcher){
  var input = config.get('input');
  var css_list = read(input, 'css');
  css_list.on("end", function(){
    if(_.isFunction(cb)){
      cb();
    }
  })
  .pipe(es.mapSync(function(file){
    return file_details(file.fullPath, file.name);
  })
  .pipe(es.through(function(file){
      if(file){
        this.pause();
        readCSS(file, function(){
            this.resume();
          }.bind(this)
        );
      }

      return file;
    })
  )

}