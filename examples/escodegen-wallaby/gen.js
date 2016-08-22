/**
 * 把ast 重新生成js
 */

const fs = require('fs');
const path = require('path');
const codegenJsx = require('escodegen-wallaby');
const utils = require('../../utils/');
const walk = require('esprima-walk');

var _path = process.argv.slice(2)[0];
var asFilePath = path.join(__dirname, _path);

var options = {

}
var tree = utils.read(asFilePath, options)
// 修改var声明的变量 => const
// 变量值＋1
walk(tree, function (node){
  if(node.type == 'VariableDeclaration'&&node.kind=='const'){
    node.kind = 'const';
    var _value = node.declarations[0].init.value;
    console.log(_value)
    node.declarations[0].init.value = _value+1;
    //node.declarations[0].init.raw = _value+1;
  }
})

var code =codegenJsx.generate(tree);


//写入新代码
fs.writeFileSync(asFilePath,code, 'utf8')
