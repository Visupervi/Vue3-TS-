<template>
  <Person ref="person"></Person>
</template>

<script lang="ts" setup name="App">
  import {ref, onMounted} from "vue"
  import Person from "./components/Person2.vue"
  // export default {
  //   name: "App",
  //   components:{Person}
  // }
  const person = ref(null)
  onMounted(()=>{
    console.log("person", person.value)
  })
</script>

<style>

</style>