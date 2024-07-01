import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  routes: [
    {
      name: "home",
      path: "/home",
      component: () => import("@/pages/home/index.vue")
    },
    {
      name: "news",
      path: "/news",
      component: () => import("@/pages/news/index.vue")
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