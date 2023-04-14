import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router";
import i18n from "./language/i18n";
import DB from "./db";
import {key, store } from './store'

router.beforeEach((to, from, next) => {
  DB.indexDB
    .openStore({
      ...DB.languageObjectStore,
      ...DB.userObjectStore,
    })
    .then((res) => {
      console.log("初始化成功")
      // 公共头部先去获取里接口,这个时候main里的数据库还没有,所以会报错,是因为这个时候还没有库
      next();
    });
});

const app = createApp(App);
app.use(store, key);
app.use(ElementPlus);
app.use(router);
app.use(i18n);
app.mount("#app");
