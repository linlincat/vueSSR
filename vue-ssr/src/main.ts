import { createSSRApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createSSRRouter } from "./router";
import { createSSRI18n } from "./language/i18n";
import { createSSRStore, key } from "./store";
import { sync } from "vuex-router-sync"; // 需要降级node 12.*版本安装


export function createApp() {
  const app = createSSRApp(App);
  const store = createSSRStore();
  const router = createSSRRouter();
  const i18n = createSSRI18n();
  sync(store, router);
  app.use(store, key);
  app.use(ElementPlus);
  app.use(router);
  app.use(i18n);
  return { app, router, store };
}

export function asyncDatgaFilter(actived: any, store: any, route: any) {
  return Promise.all(
    // asyncData方法执行成功后要有返回,Promise.all都返回成功/或有败后才能执行
    actived.map((Component: any) => {
      // 判断组件中是否有asyncData方法
      if (Component.asyncData) {
        return Component.asyncData({
          store,
          route
        });
      }
    })
  )
}
