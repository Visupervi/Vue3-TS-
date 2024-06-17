class MyPlugin {
  // 插件就是在相应的生命周期函数中注册一些函数去完成一些事情
  apply(compiler) {
    compiler.hooks.emit.tap("MyPlugin", compilation => {
      console.log("MyPlugin-----Test")
    })

    // complier.hooks.thisCompilation.tap()
  }
}

module.exports = MyPlugin;