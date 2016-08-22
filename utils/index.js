/**
 * 辅助函数
 */
const fs = require('fs');
const path = require('path');
const esprimaFb = require('esprima-fb');
const escodegenJsx = require('escodegen-wallaby');

/**
 * 把js解析成ast
 * @param  {string} path    js文件所在的路径
 * @param  {object} options esprima 解析的参数
 * @return {object}         解析成ast的对象
 */
function read(path, sourceType){
  var _opt = {
    comment: true,// == attachComments
    tokens: true,
    range: true,
    sourceType: 'module'
  }
  options = assign(_opt, {sourceType: sourceType})
  var code = fs.readFileSync(path, 'utf8');
  return esprimaFb.parse(code, options)
}

/**
 * 将ast转换成js
 * @param  {string} path    存储新生成的代码的js文件路径
 * @param  {object} tree    抽象语法树
 * @param  {} options
 * @return {}
 */
function write(path, tree){
  const options = { comment: true, format: { indent: { style: '  ' } } };
  tree = escodegenJsx.attachComments(tree, tree.comments, tree.tokens);
  var code = escodegenJsx.generate(tree, options);
  return fs.writeFileSync(path, code, 'utf8');
}

// 合并对象同名属性 浅拷贝
function assign(obj1, obj2){
  for(var k in obj1){
    if(obj2[k]!=undefined){
      obj1[k] = obj2[k];
    }
  }

  return obj1;
}
module.exports = {
  read: read,
  write: write
}
