<template>
  <div>
    <h2>学习vue3</h2>
    <Sum></Sum>
    <br>
    <!-- 绑定自定义事件 -->
    <Message @getList="getList"></Message>
  </div>
</template>

<script setup lang="ts" name="home">
  import Sum from "@/components/Sum.vue"
  import Message from "@/components/Message.vue"

  const getList = (val:number) => {
    console.log("出发自定义事件", val)
  }
</script>

<style scoped>

</style>