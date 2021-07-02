<template>
  <div class="todo-footer">
    <div class="check-content">
      <input ref="inputRef" type="checkbox" @click="selectHandler" :checked="isSelected">
      <p>已选{{ count }}个</p>
    </div>
    <button class="btn btn-danger">删除全部</button>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watchEffect} from "vue";

export default defineComponent({
  name: "TodoListFooter",
  props: ["selectAllHandler", "selectedTodos", "todos"],
  setup(props) {
    const isSelected = ref(false);
    const count = ref(0);
    watchEffect(() => {
      count.value = props.selectedTodos.length;
      props.todos.length === count.value ? isSelected.value = true : isSelected.value = false;
    });
    const selectHandler = () => {
      isSelected.value = !isSelected.value;
      props.selectAllHandler(isSelected.value);
    };
    return {
      selectHandler,
      isSelected,
      count
    };
  }
});
</script>

<style scoped lang="less">
.todo-footer {
  display: flex;
  height: 35px;
  align-items: center;
  margin-top: 10px;

  .check-content {
    display: flex;
    align-items: center;
    flex: 1;
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

    &:hover {
      cursor: pointer;
    }
  }

  .btn-danger {
    background-color: orangered;
  }
}
</style>
