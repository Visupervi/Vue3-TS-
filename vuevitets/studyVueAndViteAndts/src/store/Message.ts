import { defineStore } from "pinia"
import useTalk from "@/hooks/useTalk"

import { v7 as uuidv7 } from "uuid"
import axios from "axios"
// 规范要用hooks这种方式的命名规范
export const useMessageStore = defineStore("message", {
  actions: {
    async getTalk() {
      // const { talkList, getTalkList } = useTalk()
      // console.log("talkList", talkList)
      let { data: { content: title } } = await axios.get("https://api.uomg.com/api/rand.qinghua?format=json")
      // this.talkList.concat([...talkList])
      // getTalkList()
      this.talkList.push({
        id: uuidv7(),
        title
      })

    }
  },
  state() {
    return {
      talkList: <object[]>[]
    }
  }
})