/**
 * 辅助函数
 */
const fs = require('fs');
const path = require('path');
const esprimaFb = require('esprima-fb');

/**
 * 把js解析成ast
 * @param  {string} path    js文件所在的路径
 * @param  {object} options esprima 解析的参数
 * @return {object}         解析成ast的对象
 */
function read(path, options){
  var code = fs.readFileSync(path, 'utf8');
  return esprimaFb.parse(code, options)
}


function write(){

}

module.exports = {
  read: read,
  write: write
}
