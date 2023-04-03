import home from "@/views/home/index.vue";  // tsconfig.json配置别名编辑器不报错,在vite.config.ts配置运行不报错
import myCenter from "@/views/myCenter/index.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes:RouteRecordRaw[] = [
  {
    path: "/home",
    name: "home",
    component: home,
    meta: {
      title: "",
      keepAlive: false,
    },
  },
  {
    path: "/myCenter",
    name: "myCenter",
    component: myCenter,
    meta: {
      title: "",
      keepAlive: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
