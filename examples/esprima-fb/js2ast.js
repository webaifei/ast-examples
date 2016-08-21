const fs = require('fs');
const path = require('path');
const esprimaFb = require('esprima-fb');
// js原文件的path
var filePath = process.argv.splice(2)[0];

log(filePath)
//读取js原文件
var code = fs.readFileSync(path.join(__dirname, filePath))

// js=>ast
var tree = esprimaFb.parse(code);

stringify(tree)

// log

function log(args){
  return console.log.apply(console, [].slice.call(arguments))
}

function stringify(obj){
  log(JSON.stringify(obj))
}
