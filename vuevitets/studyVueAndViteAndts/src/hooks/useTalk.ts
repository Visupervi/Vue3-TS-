import { reactive, onMounted } from "vue"
import axios from "axios"
import { v7 as uuidv7 } from "uuid"
export default function () {
  let talkList = reactive<object[]>([]);

  const getTalkList = async () => {
    try {
      let { data: { content: title } } = await axios.get("https://api.uomg.com/api/rand.qinghua?format=json")
      talkList.push({
        id: uuidv7(),
        title
      })
      console.log("error")
    } catch (error) {
      console.log("error", error)
    }
  }
  onMounted(() => {
    getTalkList()
  })
  return {
    talkList,
    getTalkList
    
  }
}