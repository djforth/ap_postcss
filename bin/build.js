#! /usr/bin/env node

var _      = require("lodash")
 , Build   = require('../plugin/build_folder')
 , config  = require("../plugin/config")
 , fs      = require('fs')
 , program = require('commander')
 , Watch   = require("../plugin/watch_css");


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

if(program.watch){
  Watch();
} else {
  Build();
}