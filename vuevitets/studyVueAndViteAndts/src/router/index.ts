import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      name: "home",
      path: "/home",
      component: () => import("@/pages/home/index.vue")
    },
    {
      name: "news",
      path: "/news",
      component: () => import("@/pages/news/index.vue"),
      children:[
        {
          name: "detail",
          path: "detail/:content?", // 加上问号可传可不传
          component: () => import("@/pages/news/detail/index.vue"),
          // 这种方式会接收所有params的参数作为props参数传给路由组件
          // props: true

          // 这种方式可以传递query参数
          props(route){
            return route.query
          }
        }
      ]
    },
    {
      name: "about",
      path: "/about",
      component: () => import("@/pages/about/index.vue")
    }
  ],
  history: createWebHistory()
}
)

export default router