<template>
  <h2> 监听属性与计算属性</h2>
  <fieldset>
    <legend> 姓名操作</legend>
    姓氏： <input type="text" v-model="user.lastName" placeholder="请输入姓氏">
    名字： <input type="text" v-model="user.firstName" placeholder="请输入名字">
  </fieldset>
  <fieldset>
    <legend>计算属性和监听属性</legend>
    姓名： <input type="text" v-model="fullName" placeholder="显示姓名">
    姓名： <input type="text" v-model="fullName1" placeholder="显示姓名">
  </fieldset>

</template>

<script lang="ts">
import {computed, defineComponent, reactive} from "vue";

/**
 * 生命周期
 * 与 2.x 版本生命周期相对应的组合式 API
 * beforeCreate -> 使用 setup()
 * created -> 使用 setup()
 * beforeMount -> onBeforeMount
 * mounted -> onMounted
 * beforeUpdate -> onBeforeUpdate
 * updated -> onUpdated
 * beforeDestroy -> onBeforeUnmount
 * destroyed -> onUnmounted
 * errorCaptured -> onErrorCaptured
 */
export default defineComponent({
  name: "child",
  setup() {
    const user = reactive({
      firstName: "哈利",
      lastName: "波特"
    });
    const fullName = computed((): string => {
      return `${user.firstName}-${user.lastName}`;
    });
    const fullName1 = computed({
      get(): string {
        return `${user.firstName}-${user.lastName}`;
      },
      set(val: string) {
        const names = val.split("-");
        user.firstName = names[0];
        user.lastName = names[1];
        console.log("val", val);
      }
    });
    return {
      user,
      fullName,
      fullName1
    };
  }
});
</script>

<style scoped>

</style>
