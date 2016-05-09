module.exports = {
  build_folder: require("./plugin/build_folder")
 , config: require("./plugin/config")
 , get_details: require("./plugin/get_file_details")
 , postcss: require("./plugin/postcss_build")
 , read_css: require("./plugin/read_css")
 , watch_css: require("./plugin/watch_css")
}