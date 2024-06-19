
const fs = require("fs");
const path = require("path");
const parser = require("./parser")

class Compiler {
  constructor(options = {}) {
    this.options = options;
    this.modules = []; // 所有依赖
  }

  run() {
    // 1. 读取文件
    const filePath = this.options.entry;
    const fileInfo = this.build(filePath);
    this.modules.push(fileInfo);
    this.modules.forEach(fileInfo => {
      const deps = fileInfo.deps;
      // 遍历所有的依赖
      for (const relativePath in deps) {
        // 的到绝对路径
        const absolutePath = deps[relativePath];
        const fileInfo = this.build(absolutePath);
        this.modules.push(fileInfo);
      }
    })
    // console.log("ast", ast)
    // console.log("deps", deps)
    // console.log("code", code)
    // console.log("ast", ast)

    // console.log("this.module", this.modules);
    const graphs = this.modules.reduce((graph, module) => {
      return {
        ...graph,
        [module.filePath]: {
          code: module.code,
          deps: module.deps
        }
      }
    }, {})

    this.generate(graphs);
    // console.log("graphs", graphs)

    // this.generate()
  }

  build(filePath) {
    const ast = parser.getAst(filePath);
    const deps = parser.getDeps(filePath, ast);
    const code = parser.getCode(ast);
    return {
      filePath, // 当前文件路径
      deps, // 当前文件依赖
      code // 解析后的当前代码
    }
  }
  // 生成打包资源
  generate(graph) {
    const bundle = `(function(grahp){
    // 为了加载入口文件
      function require(module){
        function localRequire(relativePath){
          // 找到当前某块的路径，通过require加载
          return require(graph[module].deps[relativePath])
        }

        // 定义个暴露对象
        var exports = {};
        (function(require, exports, code){
          eval(code);
        })(localRequire, exports, grahp[module].code);
        return exports;
      }
      require('${this.options.entry}')
    })(${JSON.stringify(graph)})`

    const filePath = path.resolve(this.options.output.path, this.options.output.filename)
    fs.writeFileSync(filePath, bundle, 'utf-8')
  }
}

module.exports = Compiler;


