const PENDING = "pending"
const REASOLVED = "resolved"
const REJECTED = "rejected"
class Promise {
  constructor(excutor) {
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
  // 返回的promise的结果由onResolved/onRejected决定
  then(onResolved, onRejected) {
    onResolved = typeof onResolved === "function" ? onResolved : value => value
    onRejected = typeof onRejected === "function" ? onRejected : reason => { throw reason } // 实现异常穿透
    const self = this
    // 返回一个新的promise
    return new Promise((resolve, reject) => {
      /**
       * handle
       * @param {*} callback 
       * 指定回调函数
       * 根据执行的结果改变return的promise的状态/数据
       */

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
            // 不能直接传onResolved，因为要修改新的promise的状态，若果直接传就没办法修改新的promise的值了
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
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  // Promise函数对象的resolve方法
  // 返回一个成功指定结果的promise
  static resolve(value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })
  }


  // Promise函数对象的reject方法
  // 返回一个失败指定结果的promise
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  // Promise函数对象的all方法
  // 返回一个promise，只有当所有promise成功才成功
  // 否则只要有一个失败就失败
  static all(promises) {
    const values = new Array(promises.length) // 用来保存所有成功value的数组
    let acc = 0
    return new Promise((resolve, reject) => {
      promises.forEach((promise, index) => {
        Promise.resolve(promise).then(
          value => {
            acc++
            values[index] = value
            if (acc === promises.length) {
              resolve(values)
            }
          },
          reason => {
            reject(reason)
          }
        )
      })
    })
  }

  // Promise函数对象的race方法
  // 返回一个promise，其结果由第一个决定
  static race(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((promise, index) => {
        promise.then(
          value => {
            resolve(value)
          },
          reason => {
            reject(reason)
          }
        )
      })
    })
  }
  static resolveDelay(value, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value instanceof Promise) {
          value.then(resolve, reject)
        } else {
          resolve(value)
        }
      }, delay)
    })
  }
  static rejectDelay(reason, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(reason)
      }, delay)
    })
  }
}