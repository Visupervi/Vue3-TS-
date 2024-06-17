<template>
  <div class="home">
  </div>
  <p>{{ msg }}</p>
  <button @click="clickHandler">点击+1</button>
  <Child></Child>
  <HooksExample></HooksExample>
</template>

<script lang="ts">

/**
 * @Author visupervi
 * @Date 1:42 下午 2021/6/30
 * @Description setup是组合API的入口函数
 * @Param
 * @return
 */
import {defineComponent, ref} from "vue";
import Child from "@/components/child.vue";
// import HelloWorld from "@/components/HelloWorld.vue";// @ is an alias to /src
/**
 * ref是一个函数，作用：定义一个响应式的数据，返回一个Ref对象，对象中有一个value属性，如果需要对数据进行操作，需要使用
 * 该Ref对象调用value属性的方式进行操作
 * html的插值表达式中是不需要加上value
 * 一般是用来定义一个基本类型响应式数据的
 * 这里的msg是一个Ref类型
 */

/**
 * Vue2的响应式与Vue3的响应式
 * vue2
 * 核心:
 * 对象:
 *    通过defineProperty对对象的已有属性值的读取和修改进行劫持(监视/拦截)
 * 数组:
 *    通过重写数组更新数组一系列更新元素的方法来实现元素修改的劫持
 * 问题
 * 对象直接新添加的属性或删除已有属性, 界面不会自动更新
 * 直接通过下标替换元素或更新length, 界面不会自动更新 arr[1] = {}
 * Vue3
 * 核心:
 * 通过Proxy(代理): 拦截对data任意属性的任意(13种)操作, 包括属性值的读写, 属性的添加, 属性的删除等...
 * 通过 Reflect(反射): 动态对被代理对象的相应属性进行特定的操作
 // * //  测试prox
 // *const user = {
 //    name: "张三",
 //    gander: "女",
 //    age: 18,
 //    boyFriend: {
 //      name: "李四",
 //      gender: "男",
 //      age: 19
 //    }
 //  }
 //
 // let proxyUser = new Proxy(user, {
 //    get(target, p, receiver) {
 //      return Reflect.get(target, p);
 //      console.log("get方法调用了");
 //    },
 //    set(target, p, value, receiver) {
 //      return Reflect.set(target, p, value)
 //      console.log("set方法被调用了");
 //    },
 //    deleteProperty(target, p) {
 //      console.log("delete方法调用了")
 //    }
 //  });
 // console.log(proxyUser.name);
 // proxyUser.age = 20;
 // console.log(proxyUser);
 *
 * setup细节问题
 * setup是在beforeCreate声明周期回调之前就执行了
 * 而且执行了一次,当前组件还没创建出来，这个时候的this是undefined
 * setup返回的是一个对象，内部属性和方法是给HTML模板使用的
 *
 *
 *setup 参数问题
 * props参数：
 * 是一个对象，里面有父级组件向子组件传递的数据，并且在子组件中使用props接收到的所有属性
 * context参数
 * 是一个对象，里面有attrs对象（获取当前组件标签上的所有属性，但是该属性是在props中没有声明接收的），
 * emit方法（分发事件的）, slots对象（插槽）
 */
import HooksExample from "@/components/HooksExample.vue";
// 是Vue3的 composition API中2个最重要的响应式API
// ref用来处理基本类型数据, reactive用来处理对象(递归深度响应式)
// 如果用ref对象/数组, 内部会自动将对象/数组转换为reactive的代理对象
// ref内部: 通过给value属性添加getter/setter来实现对数据的劫持
// reactive内部: 通过使用Proxy来实现对对象内部所有数据的劫持, 并通过Reflect操作对象内部数据
// ref的数据操作: 在js中要.value, 在模板中不需要(内部解析模板时会自动添加.value)
export default defineComponent({
  name: "Home",
  components: {
    Child,
    HooksExample
  },
  beforeCreate() {
    console.log("beforeCreate执行了");
    console.log("beforeCreate执行了");
    const err2 = new Error("a is undefined!");
    console.error(err2);
    // const error = {message: 'this is error'};
    // throw error;
  },
  setup() {
    console.log("setUp执行");
    const err2 = new Error("a is undefined!");
    console.error(err2);
    const msg = ref(0);
    const clickHandler = () => {
      msg.value++;
    };
    return {
      msg,
      clickHandler
    };
  }
});
</script>
