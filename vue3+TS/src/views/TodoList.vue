<template>
  <div class="todo-main">
    <TodoListHeader @getData="getData"></TodoListHeader>
    <TodoListBody :itemArr="todos"></TodoListBody>
    <TodoListFooter></TodoListFooter>
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
    const itemArr = reactive<{todos:TodoInterface[]}>({
      todos: [
        {id: 1, title: "奥迪", isSelect: true},
        {id: 2, title: "迪奥", isSelect: false},
        {id: 3, title: "尼古拉斯-赵四", isSelect: false}
      ]
    });
    const getData = (val: string) => {
      console.log("val", val);
      itemArr.todos.push({
        id: itemArr.todos.length,
        title: val,
        isSelect: false
      });
      // itemArr.push(val);
      // console.log("itemArr", itemArr);
    };
    return {
      getData,
      ...toRefs(itemArr)
    };
  }
});
</script>

<style scoped>

</style>
