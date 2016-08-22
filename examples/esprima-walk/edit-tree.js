/**
 * 遍历抽象语法树的节点
 */

const walk = require('esprima-walk');
const path = require('path');
const utils = require('../../utils/index');

var filePath = process.argv.splice(2)[0];
var asFilePath = path.join(__dirname, filePath);

var options = {

}
var tree = utils.read(asFilePath, options);

// 遍历整个abstract syntax tree
// 如果整个树是一个js对象 那么我们是否直接能够进行修改他的属性呢？？？
// 我们尝试修改 var声明的变量 成 const声明
// 结果是我们发现 确实已经修改成功了 那我们如果重新生成js 最终，我们的目的能实现吗？？
// 请看ast＝> js escodegen-wallaby中的实例
walk(tree, function (node){
  if(node.type == 'VariableDeclaration'){
    node.kind = 'const';
    console.log(node)// kind: 'const'
  }
})
