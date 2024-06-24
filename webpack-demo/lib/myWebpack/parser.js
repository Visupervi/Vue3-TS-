const fs = require("fs");
const babelParser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");
const path = require("path");
module.exports = parser = {
  getAst(filePath) {
    // 解析词法解析
    const file = fs.readFileSync(filePath, "utf-8")
    const ast = babelParser.parse(file, {
      sourceType: 'module'
    })

    return ast;
  },
  // 获取依赖
  getDeps(filePath, ast) {
    // 获取到文件夹的路径
    const dirName = path.dirname(filePath);
    // 定义存储依赖的容器
    const deps = {};
    traverse(ast, {
      // 内部不会遍历ast中的program.body
      // 定义识别语法
      ImportDeclaration({ node }) {
        // 文件的相对路径
        const relativePath = node.source.value;
        // 生成基于入口文件的相对路径
        const absolutePath = path.resolve(dirName, relativePath);
        // 添加依赖
        deps[relativePath] = absolutePath
      }
    })

    return deps;
  },

  // 将ast解析成code
  getCode(ast) {
    // 编译代码
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })

    return code;
  }
}