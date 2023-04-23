// 应用到浏览器渲染
import { createApp } from "./main";
import DB from "./db";

const { app, router } = createApp();
router.beforeEach((to, from, next) => {
  DB.indexDB
    .openStore({
      ...DB.languageObjectStore,
      ...DB.userObjectStore,
    })
    .then((res) => {
      console.log("初始化成功");
      // 公共头部先去获取里接口,这个时候main里的数据库还没有,所以会报错,是因为这个时候还没有库
      next();
    });
});
router.isReady().then(() => {
  app.mount("#app");
});
