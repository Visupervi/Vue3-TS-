const fs = require("fs");
const util = require("util");
const path = require("path");
const readFile = util.promisify(fs.readFile);
const webpack = require("webpack");
const { RawSource } = webpack.sources;
class MyPlugin1 {
  // 插件就是在相应的生命周期函数中注册一些函数去完成一些事情
  apply(compiler) {
    // complier.hooks.emit.tap("MyPlugin", compilation => {
    //   console.log("MyPlugin-----Test")
    // })
    compiler.hooks.thisCompilation.tap("MyPlugin1", compilation => {
      // console.log("compilation====>", compilation)
      compilation.hooks.additionalAssets.tapAsync("MyPlugin1", async (cb) => {
        // debugger
        // console.log(compilation)

        const content = "hello webpack";
        compilation.assets["a.txt"] = {
          size() {
            return content.length;
          },
          source() {
            return content;
          }
        }

        const data = await readFile(path.resolve(__dirname, 'b.txt'));

        // compilation.assets['b.txt'] = new RawSource(data);
        compilation.emitAsset("b.txt", new RawSource(data));

        cb()
      })
    })
  }
}

module.exports = MyPlugin1;