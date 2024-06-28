<template>
  <div class="person">
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <!-- <h2>性别：{{ gender }}</h2> -->
    <button @click="showTel">点击查看联系方式</button>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>

    <h2>一辆{{ car.brand }}车，价值{{ car.price }}</h2>

    <button @click="changePrice">修改价格</button>
    <button @click="changeBrand">修改品牌</button>
    <br>

    <div v-for="g in games" :key="g.id">
      {{ g.name }}
    </div>

    <br>
    <div v-for="p in persons" :key="p.id">
      {{ p.name }}
    </div>

    <button @click="changePersonName">修改名字</button>
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
import { ref, reactive } from "vue"

// ref 主要在基本类型使用，也可以在对象类型使用

let name = ref("张三")
let age = ref(18)
// let gender = ref("女")
let a = 666
let tel = "15554332761"


// reactive 只能是对象类型数据
let car = reactive(
  {
    brand: "benz",
    price: 1200
  }
)

let games = reactive([
  { id: "game1", name: "Dota2" },
  { id: "game2", name: "王者荣耀" },
  { id: "game3", name: "LoL" }
])

let persons = ref([
  { id: "person1", name: "张三" },
  { id: "person2", name: "李四" },
  { id: "person3", name: "王五" }
])
const showTel = () => {
  alert()
}
const changeAge = () => {
  // age += 1
}
const changeName = () => {
  // name = "Tom-Jerry"

  name.value = "TomJerry"
}

const changePrice = () => {
  car.price += 100
}

const changeBrand = () => {
  // car = { brand: "雅迪", price: 12 }
  // car = reactive({ brand: "雅迪", price: 12 })
  // 以上都不可以用

  // 可以使用Object.assgin可以更新
  Object.assign(car,{ brand: "雅迪", price: 12 })
}

const changePersonName = () => {
  persons.value[0].name = "TomJerry"

  persons.value = [{
    id: "person11",
    name: "李华"
  }]
}

/**
 * 区别：
 * 1. ref创建的变量必须使用.value
 * 2. reactive重新分配一个对象，会失去响应式， 可以使用object.assign去整体替换
 * 
 * 使用规则：
 * 1. 若需要一个基本类型的响应数据使用ref
 * 2. 若需要一个响应式对象，层级不深,ref和reactive都可以
 * 3. 若需一个响应式对象层级比较深，推荐使用reactive 
 */
</script>

<style scoped>
.person {
  background-color: beige;
}
</style>