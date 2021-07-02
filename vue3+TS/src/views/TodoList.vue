<template>
  <div class="todo-main">
    <TodoListHeader :getData="getData"></TodoListHeader>
    <TodoListBody
      :itemArr="todos"
      :deleteItem="deleteItemHandler"
      :updateSelectTodosHandler="updateSelectTodosHandler"
    >
    </TodoListBody>
    <TodoListFooter
      :todos="todos"
      :selectedTodos="selectedTodos"
      :selectAllHandler="selectAllHandler">
    </TodoListFooter>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from "vue";
import TodoListBody from "@/components/TodoListBody.vue";
import TodoListHeader from "@/components/TodoListHeader.vue";
import TodoListFooter from "@/components/TodoListFooter.vue";
import {TodoInterface} from "@/interface/TodoInterface";

export default defineComponent({
  name: "TodoList",
  components: {
    TodoListBody,
    TodoListFooter,
    TodoListHeader
  },
  setup() {
    const itemArr = reactive<{ todos: TodoInterface[] }>({
      todos: [
        {id: 1, title: "奥迪", isSelect: false},
        {id: 2, title: "迪奥", isSelect: false},
        {id: 3, title: "尼古拉斯-赵四", isSelect: false}
      ]
    });
    const state = reactive<{ selectedTodos: TodoInterface[] }>({
      selectedTodos: []
    });
    // 添加操作
    const getData = (val: string) => {
      itemArr.todos.push({
        id: itemArr.todos.length + 1,
        title: val,
        isSelect: false
      });
    };
    // 选择框选择
    const updateSelectTodosHandler = (item: TodoInterface) => {
      item.isSelect = !item.isSelect;
      if (item.isSelect) {
        state.selectedTodos.push(item);
      } else {
        state.selectedTodos.map((value, index) => {
          if (value.id === item.id) {
            state.selectedTodos.splice(index, 1);
          }
        });
      }
    };
    // 删除操作
    const deleteItemHandler = (item: TodoInterface) => {
      itemArr.todos.map((val, index) => {
        if (val.id === item.id) {
          itemArr.todos.splice(index, 1);
        }
      });
    };
    const selectAllHandler = (isSelected: boolean) => {
      itemArr.todos.forEach((item, index) => {
        item.isSelect = isSelected;
      });
      if (isSelected) {
        itemArr.todos.map(item => {
          state.selectedTodos.push(item);
        });
      } else {
        state.selectedTodos = [];
      }
      // isSelected ? state.selectedTodos = itemArr.todos : state.selectedTodos = [];
    };
    return {
      getData,
      ...toRefs(itemArr),
      deleteItemHandler,
      selectAllHandler,
      ...toRefs(state),
      updateSelectTodosHandler
    };
  }
});
</script>

<style scoped lang="less">
.todo-main {
  width: 800px;
  margin: 0 auto;
}

</style>
