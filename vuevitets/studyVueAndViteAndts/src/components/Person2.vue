<template>
  <div class="person">
    求和：{{ sum }}
    <button @click="addHandle">累加</button>

    <h1>中国</h1>
    <h2 ref="city">上海</h2>
    <h3>浦东</h3>
  </div>
</template>

<script lang="ts" setup name="Person">
import { ref, computed, watch, reactive, watchEffect, onMounted,defineExpose } from "vue"
const city = ref(null) // 这里和react的useRef是一样的

onMounted(() => {
  // child.value 是 <Child /> 组件的实例

  console.log("city", city.value)
})
let sum = ref(0)
const addHandle = () => {
  sum.value += 1
}


console.log()
// watchEffect会立即执行
// 监听响应式数据

watchEffect(()=> {
  if(sum.value > 20) {
    console.log("121212121212")
  }
})

// 子传给父
defineExpose({sum})
// 监听reactive数据
// watch(
//   () => ({ ...person }),
//   (newVal, oldVal) => {
//     console.log("person发生变化了", newVal, oldVal)
//   })

// 减少监听范围，提高性能

// 最好使用函数的方式
// watch(
//   () => person.name,
//   (newVal, oldVal) => {
//     console.log("person发生变化了", newVal, oldVal)
//   }
// )

// watch(
//   () => person.car,
//   (newVal, oldVal) => {
//     console.log("person car发生变化了", newVal, oldVal)
//   },
//   {deep: true}
// )


// // 监视ref定义的对象类型的数据，监视属性值的变化
// watch(person1.value, (newVal, oldVal) => {
//   console.log("person1发生变化了", newVal, oldVal)
// })

// 监视ref定义的对象类型的数据，监视属性值的变化,开启deep
// 会出现一种情况，newVal和oldVal的值相同 为什么？因为是同一个对象，对象的地址没有变，所以读到的都是修改后的值
// 如何避免出这种情况？
// watch(person1, (newVal, oldVal) => {
//   console.log("person1发生变化了", newVal, oldVal)
// }, { deep: true})

// 使用下面这种方式，通过每次返回一直新的对象来触发
// watch(
//   () => ({ ...person1.value }),
//   (newVal, oldVal) => {
//     console.log('person1 changed', newVal, oldVal)
//   },
//   { deep: true}
// )
</script>

<style scoped>
.person {
  background-color: beige;
}
</style>