<template>
  <div class="message">
    当前的uuid是：{{uuid}}

    <div>
      <button @click="clickHandle">重新获取</button>
    </div>

  </div>
</template>

<script setup lang="ts" name="message">
import {ref, defineEmits, onMounted} from "vue"
import { v7 as uuidv7 } from 'uuid'
import useTalk from "@/hooks/useTalk";
import { useMessageStore } from '@/store/Message'
let uuid = ref(uuidv7())
// https://api.uomg.com/api/rand.qinghua?format=json

const talkStore = useMessageStore()
// 使用pinia
const clickHandle = () => {
  uuid.value = uuidv7()
  talkStore.getTalk()
}

// 如何触发自定义事件
const emit = defineEmits(["getList"])
// const {getTalkList, talkList} = useTalk()
onMounted(()=>{
  emit("getList", 123)
})
</script>

<style scoped>
.message {
  background-color: aqua;
}
</style>

