#! /usr/bin/env node

var _       = require("lodash")
 , config   = require("../plugin/config")
 , fs       = require('fs')
 , PostCSS  = require('../plugin/postcss_build')
 , program  = require('commander')
 , watch    = require("@djforth/ap_utils").watcher;


 program
  .version('0.0.1')
  .option('-e, --ext <list>', 'exts to process')
  .option('-i, --input <folder>', 'input folder')
  .option('-o, --output <folder>', 'output folder')
  .option('-p, --plugins <list>', 'output folder')
  .option('-w, --watch', 'Watch scripts')
  .parse(process.argv);

var options = ['ext', 'input', 'output', 'plugins']

options.forEach(function(op){
  if(!_.isEmpty(program[op]) || program[op]){
    config.set(op, program[op])
  }
});

fs.readFile('/etc/hosts', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});

var imgmin = Imagemin();

if(program.watch){
  watch(config.get("input")).onAdd(imgmin);
}