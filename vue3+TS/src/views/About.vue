<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div>姓名：{{ user.name }}</div>
  <div>年龄：{{ user.age }}</div>
  <div>车子：{{ user.cars }}</div>
  <div>妻子：{{ user.wife }}</div>
  <div>性别：{{ user.gender }}</div>
  <button @click="clickHandler">更新数据</button>
</template>
<script lang="ts">
/**
 * @Author visupervi
 * @Date 1:54 下午 2021/6/30
 * @Description
 * @Param
 * @return
 */
/**
 * reactive把数据变成响应式数据
 * 返回一个Proxy的代理对象，被代理的目标对象就是obj
 * user是代理对象，obj是目标对象
 * 响应式转换是深层的，能够影响到内部所有嵌套的属性
 * 内部是基于es6 的Proxy实现，通过代理对象操作源对象内部数据都是响应的。
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
 // */
import {defineComponent, reactive} from "vue";
import {shallowReactive} from "../utils/shallowReactive";

interface IUser {
  name: string,
  car: Array<string>
}
const proxyUser = shallowReactive<IUser>({
  name: "小红",
  car: ["audi"]
});
if (proxyUser) {
  console.log("proxyUser", proxyUser);
}
export default defineComponent({
  name: "About",
  setup() {
    const obj = {
      name: "小明",
      age: 20,
      cars: ["奔驰", "宝马", "奥迪"],
      wife: {
        name: "小红",
        age: 18,
        cars: ["玛莎拉蒂", "保时捷", "奥斯莱斯"]
      }
    };
    const user = reactive<any>(obj);
    // console.log("user", user);
    const clickHandler = () => {
      user.gender = "男";
      user.wife.cars[0] = "卡迪拉克";
      console.log("1211212121");
    };
    return {
      clickHandler,
      user
    };
    // console.log("12121212")
  }
});

</script>
