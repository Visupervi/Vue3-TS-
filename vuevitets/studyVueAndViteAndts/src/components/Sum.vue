<template>
  <div class="sum">
    <h2>当前求和为{{sum}}</h2>
    <select v-model.number="val">
      <option value="1">1</option>
      <option value="2">2</option>
    </select>
    <button @click="addHandle">加</button>
    <button @click="subHandle">减</button>
  </div>
</template>

<script setup lang="ts" name="sum">
import { ref } from 'vue';
import {useSumStore} from "@/store/Sum"
import { storeToRefs } from 'pinia';

const sumStore = useSumStore()
const {sum} = storeToRefs(sumStore)
let val = ref(1)
// let sum = ref(0)


const addHandle = () => {
  // sum.value += val.value
  // 修改pinia中的数据
  // sumStore.sum += val.value

  // 批量修改的方式
  // sumStore.$patch({
  //   sum: sumStore.sum += val.value

  // })
  // 第三种方式修改
  sumStore.increment(val.value)
}

const subHandle = () => {
  // sum.value -= val.value
  // sumStore.sum -= val.value
  sumStore.sub(val.value)
}

</script>

<style scoped>
.sum{
  background-color: bisque;
}
</style>