// 语法上来说Promise是一个构造函数
// 从功能上说，promise对象用来封装异步操作并获取其结果
// Promise的状态变化 pending ---> resolved或者rejected
// 只能从pending到resolved或者pending到rejected，如果抛出异常也会rejected
// 一个promise对象只能改变一次，无论成功还是失败，都会有一个结果，成功一般称为value，失败称为reason
// 一个promise指定都个成功/失败的回调函数，都会调用么？都会调用
// 指定回调函数的方式更加灵活
// 旧的是必须在启动异步任务前指定
// promise： 启动异步任务=》返回promise对象=》 给promise绑定回调函数（也可以在异步任务执行完成后指定）
// 支持链式调用，可以解决回调地域问题
// 回调地狱：回调函数嵌套调用，外部回调函数的异步执行结果是嵌套的回调函数的执行条件
// 不便于阅读/不便于异常处理
// 异常穿透
// 中断promise链
// 在回调函数中返回一个pendding状态的promise

// 关键的问题
/**
 * 改变promise状态和指定回调函数谁先谁后？
 * （1）都有可能，正常情况下是指定回调函数改变状态，但也可以先改变状态再指定回调
 * （2）如何先修改状态再指定回调？
 *    1️⃣ 在执行器中直接使用resolve或者reject
 *    2️⃣ 延迟更长时间再去调用then
 *  (3) 什么时候才能得到数据？
 *    1️⃣ 如果先指定的回调，那当状态发生改变时，回调函数就会调用，得到数据
 *    2️⃣ 如果先改变状态，那当指定回调时，回调函数就会调用，得到数据
 */

/**
 * promise.then 返回的是一个新的promise，这个promise的状态是由什么决定的？
 * 
 * 由then指定的回调函数执行的结果决定的
 * 
 * 1️⃣ 如果抛出异常，新的promise状态为rejected，reason为抛出的异常
 * 2️⃣ 如果返回的是非promise的任意值，新promise变为resolved,value为返回值
 * 3️⃣ 如果返回的是另一个新的promise，此promise的结果就会成为新的promise的结果
 */

// 手写promise

(
  function (window) {
    const PENDING = "pending"
    const REASOLVED = "resolved"
    const REJECTED = "rejected"
    function Promise(excutor) {
      const self = this;
      self.status = PENDING // 给promise对象指定status属性， 初始值魏pending
      self.data = undefined // 给promise对象指定一个用于存储结果数据的属性
      self.callbacks = [] // 每个元素的结构：{onResoved(){},onRejected(){}}
      // 立即执行执行器
      function resolve(value) {
        // 因为只能从pending到resolved，所以如果不是pending就需要结束操作
        if (self.status !== PENDING) {
          return
        }
        // 将状态改变
        self.status = REASOLVED
        // 保存数据
        self.data = value
        // 如果有待执行的callback函数，就要先去执行回调函数
        if (self.callbacks.length > 0) {
          self.callbacks.forEach(callbacksObj => {
            // 模拟异步
            setTimeout(() => {
              callbacksObj.onResolved(value)
            })
          });
        }
      }
      function reject(reason) {
        // 因为只能从pending到rejected，所以如果不是pending就需要结束操作
        if (self.status !== PENDING) {
          return
        }
        // 将状态改变
        self.status = REJECTED
        // 保存数据
        self.data = reason
        // 如果有待执行的callback函数，就要先去执行回调函数
        if (self.callbacks.length > 0) {
          self.callbacks.forEach(callbacksObj => {
            // 模拟异步
            setTimeout(() => {
              callbacksObj.onRejected(reason)
            })
          });
        }
      }

      // 如果执行器抛出异常，promise状态变为rejected
      try {
        excutor(resolve, reject)
      } catch (err) {
        reject(err)
      }

    }

    // Promise 的原型对象方法then,指定成功或者失败的回调函数
    // 返回一个promise
    Promise.prototype.then = function (onResolved, onRejected) {
      onResolved = typeof onResolved === "function" ? onResolved : value => value // 实现异常穿透
      onRejected = typeof onRejected === "function" ? onRejected : reason => { throw reason } // 实现异常穿透
      const self = this
      // 返回一个新的promise
      return new Promise((resolve, reject) => {

        function handle(callback) {
          // 如果抛出异常，reason是err
          // 如果回调函数返回的不是promise，return的promise就会成功，value就是返回的值，
          // 如果返回的是promise，return的promise就会根据这个promise的结果返回 
          try {
            const result = callback(self.data)
            if (result instanceof Promise) {
              // result.then(
              //   value => resolve(value),
              //   reason => reject(reason)
              //   )
              result.then(resolve, reject)
            } else {
              resolve(result)
            }

          } catch (err) {
            reject(err)
          }
        }
        // 如果状态是pending，先保存回调函数
        if (self.status === PENDING) {
          self.callbacks.push(
            {
              // 不能直接传onResolved， 因为要修改新的promise的状态，若果直接传就没办法修改新的promise的值了
              onResolved(value) {
                handle(onResolved)
              },
              onRejected(reason) {
                handle(onRejected)
              }
            })
        } else if (self.status === REASOLVED) {
          // this.callbacks.push({ onResolved, null })
          setTimeout(() => {
            // 如果抛出异常，reason是err
            // 如果回调函数返回的不是promise，return的promise就会成功，value就是返回的值，
            // 如果返回的是promise，return的promise就会根据这个promise的结果返回 
            handle(onResolved)
            // try {
            //   const result = onResolved(self.data)
            //   if (result instanceof Promise) {
            //     // result.then(
            //     //   value => resolve(value),
            //     //   reason => reject(reason)
            //     //   )
            //     result.then(resolve, reject)
            //   } else {
            //     resolve(result)
            //   }

            // } catch (err) {
            //   reject(err)
            // }

          })
        } else {
          setTimeout(() => {
            // 如果抛出异常，reason是err
            // 如果回调函数返回的不是promise，return的promise就会成功，value就是返回的值，
            // 如果返回的是promise，return的promise就会根据这个promise的结果返回 
            handle(onRejected)
            // try {
            //   const result = onRejected(self.data)
            //   if (result instanceof Promise) {
            //     // result.then(
            //     //   value => resolve(value),
            //     //   reason => reject(reason)
            //     //   )
            //     result.then(resolve, reject)
            //   } else {
            //     resolve(result)
            //   }

            // } catch (err) {
            //   reject(err)
            // }

          })
        }
      })

    }

    // Promise 的原型对象方法catch
    // 指定失败的回调函数
    // 返回一个新的promise
    Promise.prototype.catch = function (onRejected) {
      return this.then(undefined, onRejected)
    }

    // Promise函数对象的resolve方法
    // 返回一个成功指定结果的promise
    Promise.resolve = function (value) { }

    // Promise函数对象的reject方法
    // 返回一个失败指定结果的promise
    Promise.reject = function (reason) { }

    // Promise函数对象的all方法
    // 返回一个promise，只有当所有promise成功才成功
    // 否则只要有一个失败就失败
    Promise.all = function (promises) { }

    // Promise函数对象的race方法
    // 返回一个promise，其结果由第一个决定
    Promise.race = function (promises) { }
    window.Promise = Promise
  }
)(window)