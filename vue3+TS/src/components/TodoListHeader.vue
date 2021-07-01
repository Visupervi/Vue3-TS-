<template>
  <div class="todo-header">
    <input type="text" v-model="inputValue">
    <button class="btn btn-prime" @click="addHandler">添加</button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "TodoListHeader",
  setup(props, {emit}) {
    const inputValue = ref("");
    const addHandler = () => {
      emit("getData", inputValue.value);
      inputValue.value = "";
      console.log("12212121", inputValue.value);
    };
    return {
      addHandler,
      inputValue
    };
  }
});
</script>

<style scoped lang="less">
.todo-header {
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    display: flex;
    height: 33px;
    padding: 0;
    width: 250px;
    outline: none;
    margin-right: 10px;
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
    &:hover{
      cursor:pointer;
    }
  }

  .btn-prime {
    background: cornflowerblue;
  }
}

</style>
