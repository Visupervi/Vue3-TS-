<template>
  <div>
    {{ content }}
  </div>
</template>

<script setup lang="ts" name>
// import { toRef, toRefs } from 'vue';
// import { useRoute } from 'vue-router';
// const route = useRoute()
defineProps(["content"])
// // console.log("route", route)

// // const {query} = toRefs(route)

// const {params} = toRefs(route)
</script>

<style scoped></style>