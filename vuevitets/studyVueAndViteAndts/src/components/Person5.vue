<template>
  <div class="person">
    <div class="img-wrap" v-for="(dog, index) in dogList" :key="index">
      <img :src="dog" alt="">
    </div>
  </div>
  <button @click="getDogHandle">再来一只狗</button>
</template>

<script lang="ts" setup name="Person">
  import useDog from "@/hooks/useDog"
  const {dogList, getDogHandle} = useDog()
</script>

<style scoped>
.person {
  background-color: beige;
  display: flex;
  flex-direction: row;
}

.img-wrap {
  height: 300px;
  /* height: (300 * 9/16)px; */
  margin-right: 10px;
}

.img-wrap img {
  height: 100%;
  /* height: 100%; */
}
</style>