import { createSSRApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router";
import i18n from "./language/i18n";
import DB from "./db";
import { key, store } from "./store";


export function createApp() {
  const app = createSSRApp(App);
  app.use(store, key);
  app.use(ElementPlus);
  app.use(router);
  app.use(i18n);
  return { app, router };
}
