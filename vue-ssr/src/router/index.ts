const home = () => import("@/views/home/homeIndex.vue"); // tsconfig.json配置别名编辑器不报错,在vite.config.ts配置运行不报错
const myCenter = () => import("@/views/myCenter/myCenterIndex.vue");
const login = () => import("@/views/login/loginIndex.vue");
import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
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
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      title: "",
      keepAlive: false,
    },
  },
];

export function createSSRRouter() {
  return createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(), // 客户端
    routes,
  });
}
