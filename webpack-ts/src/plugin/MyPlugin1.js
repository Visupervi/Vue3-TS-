class MyPlugin1 {
  // 插件就是在相应的生命周期函数中注册一些函数去完成一些事情
  apply(complier) {
    // complier.hooks.emit.tap("MyPlugin", compilation => {
    //   console.log("MyPlugin-----Test")
    // })

    complier.hooks.thisCompilation.tap("MyPlugin1", compilation => {
      console.log("compilation====>", compilation)
    })
  }
}

module.exports = MyPlugin1;