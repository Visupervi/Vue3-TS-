import { ref, onMounted } from "vue"
import axios from "axios";
export default function () {
  let dogList = ref([
    "https://images.dog.ceo/breeds/pembroke/n02113023_5032.jpg"
  ])
  const getDogHandle = async () => {
    try {
      let result = await axios.get("https://dog.ceo/api/breed/pembroke/images/random")
      dogList.value.push(result.data.message)
    } catch (err) {
      alert(err)
    }
    // console.log("result", result)
  }
  onMounted(()=>{
    getDogHandle()
  })
  return {
    dogList,
    getDogHandle
  }
}
