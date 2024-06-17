import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import {btrace4h5} from "../src/utils/btrace4h5";

// btrace4h5({
//   serviceName: "serviceName",
//   systemName: "systemName",
//   apiRequestIsEnable: true,
//   errorMsgIsEnable: true,
//   // frameworkName: Vue,
//   logContextReportUrl: "http://localhost:8080/v1/btxm/collect/log-context-collect",
//   apiContextReportUrl: "http://localhost:8080/v1/btxm/collect/api-context-collect"
// });

// 声明式渲染
// 与大多数应用方法不同的是，mount 不返回应用本身。相反，它返回的是根组件实例
createApp(App).use(store).use(router).mount("#app");
