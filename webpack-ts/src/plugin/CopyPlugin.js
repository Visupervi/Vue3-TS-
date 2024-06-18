const fs = require("fs");
const util = require("util");
const path = require("path");
const globby = require("globby");
const webpack = require("webpack");
const { validate } = require('schema-utils'); // 校验参数格式是否正确
const readFile = util.promisify(fs.readFile);
const { RawSource } = webpack.sources;
const scema = require("./schema.json")
class CopyPlugin {
  constructor(options = {}) {
    validate(scema, options, {
      name: "CopyPlugin"
    });
    this.options = options;
  }
  apply(compiler) {
    // 初始化compilation
    compiler.hooks.thisCompilation.tap("CopyPlugin", compilation => {
      // 在添加资源初始化hooks
      compilation.hooks.additionalAssets.tapAsync("CopyPlugin", async (cb) => {
        const { from, ignore, to = '.' } = this.options;
        console.log("this.options", this.options)
        // context就是webpack的配置
        // 运行指令的目录
        const context = compiler.options.context

        // console.log("context", context)
        // 将输入路径变成绝对路径
        const absolutePath = path.isAbsolute(from) ? from : path.resolve(context, from)


        // globby要处理的文件夹
        const paths = await globby([absolutePath], { ignore })
        // console.log("tototototo", to)

        // 读取path中的content
        // map遇到async 并不会等待，所以加一个Promise.all去处理，利用的就是map方法返回的事一个数组，
        const files = await Promise.all(
          // 返回值是一个promise数组
          paths.map(async (item) => {
            // console.log('ietm', item)
            const data = await readFile(item);
            // 获取文件名称，获取最后的文件名称
            const filename = path.basename(item);
            return {
              data,
              filename
            }
          })
        )

        const assets = files.map(file => {
          const source = new RawSource(file.data);
          return {
            source,
            filename: file.filename
          }
        })

        assets.forEach(item => {
          compilation.emitAsset(item.filename, item.source);
        })

        // const data = await readFile(path.resolve(__dirname, 'b.txt'));
        // compilation.assets['b.txt'] = new RawSource(data);
        // compilation.emitAsset("b.txt", new RawSource(data));
        cb()
      })
    })
  }
}

module.exports = CopyPlugin;

