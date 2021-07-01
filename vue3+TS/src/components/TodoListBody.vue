<template>
  <li v-for="item in itemArr" :key="item.id">
    <label>
      <input type="checkbox" :checked="item.isSelect">
      <span>{{item.title}}</span>
    </label>
    <button v-show="item.isSelect" class="btn btn-danger">删除</button>
  </li>
</template>

<script lang="ts">
import {defineComponent, inject} from "vue";

export default defineComponent({
  name: "TodoListBody",
  props: ["itemArr"],
  setup(props, {emit}) {
    console.log("props", inject("itemArr"));
  }
});
</script>

<style scoped lang="less">
li {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  }

  .btn {
    width: 100px;
    height: 35px;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: aliceblue;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
  }

  .btn-danger {
    background-color: orangered;
  }
}
</style>
