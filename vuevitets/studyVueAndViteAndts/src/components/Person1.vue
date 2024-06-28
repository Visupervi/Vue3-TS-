<template>
  <div class="person">
    姓：<input type="text" v-model="firstName"></input>
    <br>
    名：<input type="text" v-model="lastName"></input>
    <br>
    全名：<span>{{ fullName }}</span>

    <br>

    求和：{{ sum }}

    <button @click="addHandle">累加</button>

    <br>
    <div>person姓名：{{ person.name }}</div>
    <div>person年龄：{{ person.age }}</div>

    <!-- <div>person1姓名：{{ person1.name }}</div>
    <div>person1年龄：{{ person1.age }}</div> -->

    <button @click="changeName">修改姓名</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeAll">修改整个</button>
    <button @click="changeC1">修改c1</button>
    <button @click="changeC2">修改c2</button>
    <button @click="changeCarAll">修改car</button>
  </div>
</template>

<!-- <script lang="ts">
/**
 * data() methods可以与 setup同时存在， 旧的可以读到新的，新的读不到旧的
 * 
 * setup在breforeCreate()之前执行
 * 
 * setup语法糖，
 */
export default {
  name: "Person",
  // data() {
  //   return {
  //     name: "Tom",
  //     age: 20,
  //     gender: "男"
  //   }
  // },
  // methods: {
  //   showTel() {
  //     console.log("15554222761")
  //   },
  //   changeName() { 
  //   },
  //   changeAge() { }
  // },
  // setup(props, ctx) {
  //   let name = "Tom" // 此时不是响应式
  //   let age = 18
  //   let gender = "女"
  //   let tel = "15554222761"

  //   function showTel(){
  //     alert(tel)
  //   }
  //   function changeAge(){
  //     age += 1
  //   }
  //   function changeName(){
  //     name = "Tom-Jerry"
  //   }

  //   return {
  //     name,
  //     age,
  //     gender,
  //     showTel,
  //     changeAge,
  //     changeName
  //   }
  // },

}
</script> -->

<script lang="ts" setup name="Person">
import { ref, computed, watch, reactive } from "vue"

let firstName = ref("zhang")
let lastName = ref("san")

let sum = ref(0)

let person = reactive({
  name: "张三",
  age: 18,
  gender: "女",
  car: {
    c1: "Benz",
    c2: "Audi"
  }
})

let person1 = ref({
  name: "Tom",
  age: 18,
  gender: "女"
})
// 这样是一个只读
// let fullName = computed(()=>{
//   return firstName.value.slice(0,1).toUpperCase() + firstName.value.slice(1) + lastName.value
// })
// 可读可写
let fullName = computed({
  get() {
    return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + lastName.value
  },
  set(val) {
    const [str1, str2] = val.split("-")
    firstName.value = str1
    lastName.value = str2
  }
})

const addHandle = () => {
  sum.value += 1
}

// 监视ref的基本类型数据
const stop = watch(sum, (newVal, oldVal) => {
  console.log("sum", newVal, oldVal)
  if (newVal > 10) {
    stop() // 取消监视
  }
})


const changeName = () => {
  person.name += "#"
  // person1.value.name += "&"

}

//
const changeAll = () => {
  Object.assign(person, { name: "HelloKitty", age: 20, gender: "男" })
  // person1.value = { name: "HelloKitty", age: 20, gender: "男" }
}

const changeAge = () => {
  person.age += 2
  // person1.value.age += 1
}
const changeC1 = () => {
  person.car.c1 += "toyoto"
}
const changeC2 = () => {
  person.car.c2 = "focus"
}

const changeCarAll = () => {
  person.car = {
    c1: "雅迪",
    c2: "九号"
  }
}
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

watch(
  () => [person.name, person.car.c1],
  (newVal, oldVal) => {
    console.log("person car发生变化了", newVal, oldVal)
  },
  { deep: true }
)
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