import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/client/Index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//路由拦截
router.beforeEach((to, from, next) => {
  // ...
  next();
});

export default router;
