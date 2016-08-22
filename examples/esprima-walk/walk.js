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
walk(tree, function (node){
  console.log(node.type)
})
