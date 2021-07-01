<template>
  <h2>自定义hooks函数</h2>
  <div>
    <p>x:{{ x }}</p>
    <p>y:{{ y }}</p>
  </div>
  <div>
    <p>姓名:{{ name }}</p>
    <p>年龄:{{ age }}</p>
  </div>
  <div>
    <h2>ref的使用</h2>
    <input type="text" ref="inputRef">
  </div>
  <div>
    <p>{{ keyWord }}</p>
    <input type="text" v-model="keyWord">
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref, toRefs, customRef} from "vue";
import useMousePoint from "@/hooks/useMousePoint";

// 自定义防抖函数
/**
 * customRef
 // 创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制
 // 需求: 使用 customRef 实现 debounce 的示例
 */

function userDebouncedRef<T>(value: T, delay = 300) {
  let timer: number;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue: T) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      }
    };
  });
}

// 收集用户点击的坐标点
export default defineComponent({
  name: "hooksExample",
  setup() {
    const {x, y} = useMousePoint();
    const keyWord = userDebouncedRef("", 300);
    // 默认是空的
    const inputRef = ref<HTMLElement | null>(null);
    const state = reactive({
      name: "李华",
      age: 8
    });
    onMounted(() => {
      inputRef.value && inputRef.value.focus();
    });
    /**
     // toRefs把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref
     // 当从合成函数返回响应式对象时，toRefs 非常有用，这样消费组件就可以在不丢失响应式的情况下对返回的对象进行分解使用
     // 问题: reactive 对象取出的所有属性值都是非响应式的
     // 解决: 利用 toRefs 可以将一个响应式 reactive 对象的所有原始属性转换为响应式的 ref 属性
     // shallowReactive 与 shallowRef
     // shallowReactive : 只处理了对象内最外层属性的响应式(也就是浅响应式)
     //
     // shallowRef: 只处理了value的响应式, 不进行对象的reactive处理
     //
     // 什么时候用浅响应式呢?
     //
     // 一般情况下使用ref和reactive即可
     // 如果有一个对象数据, 结构比较深, 但变化时只是外层属性变化 ===> shallowReactive
     // 如果有一个对象数据, 后面会产生新的对象来替换 ===> shallowRef

     // readonly:
     // 深度只读数据
     // 获取一个对象 (响应式或纯对象) 或 ref 并返回原始代理的只读代理。
     // 只读代理是深层的：访问的任何嵌套 property 也是只读的。
     // shallowReadonly
     // 浅只读数据
     // 创建一个代理，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换
     // 应用场景:
     // 在某些特定情况下, 我们可能不希望对数据进行更新的操作, 那就可以包装生成一个只读代理对象来读取数据, 而不能修改或删除

     // toRaw
     // 返回由 reactive 或 readonly 方法转换成响应式代理的普通对象。
     // 这是一个还原方法，可用于临时读取，访问不会被代理/跟踪，写入时也不会触发界面更新。
     // markRaw
     // 标记一个对象，使其永远不会转换为代理。返回对象本身
     // 应用场景:
     // 有些值不应被设置为响应式的，例如复杂的第三方类实例或 Vue 组件对象。
     // 当渲染具有不可变数据源的大列表时，跳过代理转换可以提高性能。

     // toRef
     // 为源响应式对象上的某个属性创建一个 ref对象, 二者内部操作的是同一个数据值, 更新时二者是同步的
     // 区别ref: 拷贝了一份新的数据值单独操作, 更新时相互不影响
     // 应用: 当要将 某个prop 的 ref 传递给复合函数时，toRef 很有用
     */
    const {name, age} = toRefs(state);
    setInterval(() => {
      // name.value += "==";
    }, 1000);
    return {
      x,
      y,
      inputRef,
      name,
      age,
      keyWord
      // ...state // 不是响应式的数据
    };
  }
});
</script>

<style scoped>

</style>
