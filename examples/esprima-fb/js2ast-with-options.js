const fs = require('fs');
const path = require('path');
const esprimaFb = require('esprima-fb');

//要解析的js路径
var filePath = process.argv.slice(2)[0];
log(filePath);
// 查看各个参数的具体作用 可以通过
// http://esprima.org/demo/parse.html选择不同的配置来查看解析的树结构
var options = {
  //是否把注释代码也解析到抽象语法树上 会增加 comments 和 range属性
  //1. 添加注释comments属性
  //2. 自动开启range属性 标志位置信息
  attachComment: false,
  // attachComment的别名
  // comment: true,
  // range会包含各个节点的位置信息 （start, end）
  range: false,
  // js的类型 是es6模块 还是script
  sourceType: 'module',
  // 通过行列的形式 标志节点的位置信息
  loc: false,
  // 增加tokens属性 具体干啥 现在不知道？？
  tokens: true
}
var code = fs.readFileSync(filePath);
var tree = esprimaFb.parse(code, options);

log(JSON.stringify(tree))

function log() {
  return console.log.apply(console, [].slice.call(arguments))
}
