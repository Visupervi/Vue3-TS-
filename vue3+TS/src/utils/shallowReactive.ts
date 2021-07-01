const reactiveHandler: ProxyHandler<any> = {
  get(target: object, prop: string | number | symbol, receiver: any) {

    return Reflect.get(target, prop)
  },
  set(target: object, prop: string | number | symbol, value: any, receiver: any) {
    console.log("设置属性");
    return Reflect.set(target, prop, value)
  },
  deleteProperty(target: any, prop: any): boolean {
    console.log("调用函数");
    return true
  }
}

export const shallowReactive = <T>(target: object | T ): object | T => {
  if (target && typeof target === 'object') {
    return new Proxy(target, reactiveHandler)
  }
  return target;
}

function reactive(target:object) {

  if(target && typeof target === "object"){
    if(Array.isArray(target)){
      target.map((item,index) => {
        target[index] = item;
      })
    } else {
      Object.keys(target).forEach(key => {
        // target[key] = target[key]
      })
    }
  }

}
