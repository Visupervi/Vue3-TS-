<template>
  <div class="person">
    <h1>中国</h1>
    <h2 ref="city">上海</h2>
    <h3>浦东</h3>
    <div v-for="p in personList" :key="p.id">
      姓名：{{ p.name }}
      年龄：{{ p.age }}
    </div>
  </div>
</template>

<script lang="ts" setup name="Person">
import {withDefaults} from "vue"
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
</script>

<style scoped>
.person {
  background-color: beige;
}
</style>