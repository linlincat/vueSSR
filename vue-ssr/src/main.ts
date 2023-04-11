import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router";
import i18n from "./language/i18n";
import DB from "./db";
import { store } from './store'

router.beforeEach((to, from, next) => {
  DB.indexDB
    .openStore({
      ...DB.languageObjectStore,
      ...DB.userObjectStore,
    })
    .then((res) => {
      // 公共头部先去获取里接口,这个时候main里的数据库还没有
      next();
    });
});

const app = createApp(App);
app.use(store);
app.use(ElementPlus);
app.use(router);
app.use(i18n);
app.mount("#app");
