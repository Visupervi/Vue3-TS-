<template>
  <div>
    <ul>
      <li v-for="n in newList" :key="n.id">
        <RouterLink :to="{
          name: 'detail', params: {
            // id: n.id,
            // title: n.title,
            content: n.content
          }
        }">{{ n.title }}</RouterLink>
      </li>
    </ul>
    <div>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts" name="news">
import { ref } from 'vue'
import { RouterLink, RouterView } from "vue-router"

let newList = ref([
  { id: "01", title: "国际", content: 'BBC' },
  { id: "02", title: "国内", content: 'cctv' },
  { id: "03", title: "日本", content: 'JKC' },
  { id: "04", title: "美国", content: 'ADC' },
])

</script>

<style scoped></style>