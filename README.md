## AST （abstract syntax tree）
> 官方描述： 是源代码的抽象语法结构的树状表现形式
简单的来说，


## 能做什么？
> 抽象语法树的用处非常多，比如我们常见的代码压缩（之前我天真的以为代码压缩应该就是正则匹配替换掉换行和空格，再一次使用uglifyjs压缩代码测试的时候，发现一个没有用到的函数声明在压缩后的代码中彻底没找到！！），IDE的代码提示，错误提示，编译器等等。

就拿上面的我遇到的问题来说，它是怎么实现的检测到我定义了这个函数，但是没有使用呢。其实内部原来就是把整个代码解析成一棵树，包含了各种类型的节点，类似于我们熟悉的dom树（这点来看，其实很多技术的思想都是相通的）

我是在研究yeoman生成器[mock-server](https://github.com/webaifei/generator-mock-server)的时候，需要修改已经存在的文件内容，遇到这个问题。

```
//AST
{
  "type": "Program",
  "body": [
      {
          "type": "FunctionDeclaration",
          "id": {
              "type": "Identifier",
              "name": "sau"
          },
          "params": [],
          "defaults": [],
          "body": {
              "type": "BlockStatement",
              "body": [
                  {
                      "type": "VariableDeclaration",
                      "declarations": [
                          {
                              "type": "VariableDeclarator",
                              "id": {
                                  "type": "Identifier",
                                  "name": "inner"
                              },
                              "init": {
                                  "type": "Identifier",
                                  "name": "answer"
                              }
                          }
                      ],
                      "kind": "var"
                  }
              ]
          },
          "generator": false,
          "expression": false
      },
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "CallExpression",
              "callee": {
                  "type": "Identifier",
                  "name": "sau"
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}
```
1. tree结构

  ```
  tree
    - node
    - node
    ...
  ```
2. tree根节点结构

  ```
  {
    type:'Program',
    body:[

    ]
  }
  ```
3. node 结构

  ```
  {
    type:'xxx',
    body:[

    ],
    ...
  }
  ```

4. 除了变量node，其他的大概都有的两个属性 type body
5. 除了type，body两个属性 每个节点上还包含了很多其他描述属性。比如：我们的函数声明node中包含一个id.name 就是我们的函数名， 而函数调用中有个expression.callee指向调用的函数名，我们只需要遍历整个树，查看定义的node 的id.name 在expression.callee中是否存在 就能知道我们的这个函数是否被调用过，如果没有调用过 我们就可以把这个函数定义的node删除掉！然后再把抽象语法树转换成js代码就ok了

> 上面的实现中，有三个比较重要的步骤
1. js => ast
2. 遍历ast 修改
3. ast => js
## 如何把js解析成语法树
这里，个人能力的缘故还不到去关注js＝>ast转换的实现细节的时候，我们只要能实现就行，比较流行的有两个库：
1. [esprima](http://esprima.org/demo/parse.html) 把js转换成ast
2. [esprima-fb 来自facebook,基于esprima](https://github.com/facebookarchive/esprima) 兼容jsx js|jsx => ast

## 遍历ast树
1. [estraverse](https://github.com/estools/estraverse)
2. [esprima-walk](https://github.com/jrajav/esprima-walk)

## 操作ast树


## ast转换成js
1. [escodegen](https://github.com/estools/escodegen)
2. [escodegen-wallaby](https://github.com/wallabyjs/escodegen) 兼容jsx 对应上面的esprima-fb
