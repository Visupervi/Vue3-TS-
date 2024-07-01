<template>
  <div class="person">
    当前求和为：{{ sum }}

    <button @click="clickHandle">点击我+1</button>
  </div>
</template>

<script lang="ts" setup name="Person">
import {ref, withDefaults, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted} from "vue"
import type { Persons } from '@/types';

// import {defineProps} from "vue"
// import { type Person, type Persons } from "@/types";

//   let person: Person = {
//     name: "张三",
//     id: "zhangsan",
//     age: 18
//   }
//   let persons: Persons = [
//     {
//       name: "张四",
//       id: "zhangsi",
//       age: 19
//     },
//     {
//       name: "张二",
//       id: "zhanger",
//       age: 18
//     },

//   ]

// 接受传递的值
// defineProps(["personList"])
// 接受传递的值并保存

// let dp = defineProps(["personList"])

// console.log("dp", dp.personList)


// 接受传递的值并限制类型
// defineProps<{personList:Persons}>()

// 接受传递的值并限制类型添加默认值，可传可不传
// defineProps<{personList?:Persons}>()

withDefaults(defineProps<{personList?:Persons}>(),{
  personList: () => [{id: "zhangliu", name:"张六", age: 10}]
})

let sum = ref(0)
const clickHandle = () => {
  sum.value += 1
}

// 生命周期函数

// 创建 ，在vue3中没有了beforeCreate 和 created, 在setup中直接代替了这两个生命周期
console.log("创建")
// 挂载
onBeforeMount(()=>{
  console.log("子挂载之前")
})

// 挂载完毕
onMounted(()=>{
  console.log("子挂载完毕")
})

onBeforeUpdate(()=>{
  console.log("子更新之前")
})

onUpdated(()=>{
  console.log("子更新完毕")
})

// 卸载之前
onBeforeUnmount(()=>{
  console.log("子卸载之前")
})
onUnmounted(()=>{
  console.log("子卸载后")
})
</script>

<style scoped>
.person {
  background-color: beige;
}
</style>