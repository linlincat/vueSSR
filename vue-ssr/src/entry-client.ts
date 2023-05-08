// 应用到浏览器渲染
import { createApp } from "./main";
import DB from "./db";
const { app, router, store } = createApp();
if (window.__INITIAL_STATE__) {
  // 如果服务端渲染的时候赋予来值,用来同步到客户端中
  store.replaceState(window.__INITIAL_STATE__);
}
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
  router.beforeResolve((to, from, next) => {
    let toComponents = router
      .resolve(to)
      .matched.flatMap((record) => Object.values(record.components));
    let formComponents = router
      .resolve(from)
      .matched.flatMap((record) => Object.values(record.components));

    let actived = toComponents.filter((component, index) => {
      return formComponents[index] !== component;
    });
    // 没有匹配到刷新只是负责跳转,否则重新拉取数据渲染页面
    if (!actived.length) {
      return next();
    }
    Promise.all(
      // asyncData方法执行成功后要有返回,Promise.all都返回成功/活有败后才能执行
      actived.map((Component: any) => {
        // 判断组件中是否有asyncData方法
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute,
          });
        }
      })
    ).then(() => {
      next();
    });
  });

  app.mount("#app");
});
