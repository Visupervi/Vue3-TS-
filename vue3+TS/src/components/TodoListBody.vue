<template>
  <li v-for="item in itemArr" :key="item.id">
    <label>
      <input type="checkbox" :checked="item.isSelect" @click.stop="changeCheckHandler(item)">
      <span>{{ item.title }}</span>
    </label>
    <button v-show="item.isSelect" class="btn btn-danger" @click.stop="deleteHandler(item)">删除</button>
  </li>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {TodoInterface} from "@/interface/TodoInterface";

export default defineComponent({
  name: "TodoListBody",
  props: ["deleteItem", "itemArr", "updateSelectTodosHandler"],
  setup(props, {emit}) {
    const deleteHandler = (item: TodoInterface) => {
      props.deleteItem(item);
    };
    const changeCheckHandler = (item: TodoInterface) => {
      props.updateSelectTodosHandler(item);
    };
    return {
      deleteHandler,
      changeCheckHandler
    };
  }
});
</script>

<style scoped lang="less">
li {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  border-bottom: 1px solid #ccc;
  margin-top: 5px;
  padding: 5px;

  &:hover {
    background: bisque;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: left;
    margin-right: 20px;
    flex: 2;
    //text-align: left;
  }

  .btn {
    width: 60px;
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
    flex: 1;

    &:hover {
      cursor: pointer;
    }
  }

  .btn-danger {
    background-color: orangered;
  }
}
</style>
