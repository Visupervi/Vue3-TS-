import { createApp } from "vue"
import router from "./router"
import App from "./App.vue"
import { createPinia } from "pinia"
const app = createApp(App)
// 创建pinia
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount("#app")

// 集中式状态管理

// vuex, pina, redux