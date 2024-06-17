const { SyncHook, SyncBailHook, AsyncParallelHook, AsyncSeriesHook } = require("tapable")

class Lession {
  constructor() {
    // 初始化hooks容器 SyncBailHook一旦有返回值就会退出
    this.hooks = {
      go: new SyncHook(['address']),
      leave: new AsyncParallelHook()
    }
  }
  tap() {
    // 往hooks容器中注册事件/添加回调函数
    this.hooks.go.tap('webpack-ts', addr => {
      console.log("address=>", addr);
    })
  }

  start() {
    // 触发所有hooks
    this.hooks.go.call("webpack-ts001");
  }
}

const l = new Lession();

l.tap();
l.start();