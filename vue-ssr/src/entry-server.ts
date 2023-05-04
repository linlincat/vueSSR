// 在服务端渲染
import { createApp } from "./main";
import { renderToString } from "vue/server-renderer";

export async function render(url: string) {
  const { app, router, store } = createApp();
  await router.push(url);
  await router.isReady();
  //匹配到的所有路由组件
  const matchHedComponents = router.currentRoute.value.matched.flatMap(
    (record) => Object.values(record.components)
  );
  await Promise.all(
    matchHedComponents.map((Component: any) => {
      // 判断组件中是否有asyncData方法
      if (Component.asyncData) {
        return Component.asyncData({
          store,
          route: router.currentRoute,
        });
      }
    })
  );

  const appHtml = await renderToString(app);
  const state = store.state;
  return { appHtml, state };
}
