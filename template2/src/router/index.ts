import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [];

const router = createRouter({
  // history: createWebHashHistory(), // hash 路由模式
  history: createWebHistory(), // history 路由模式
  routes, // 路由规则
});

export default router;
