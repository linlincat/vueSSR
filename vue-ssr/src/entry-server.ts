// 在服务端渲染
import { basename } from "node:path";
import { createApp } from "./main";
import { renderToString } from "vue/server-renderer";

export async function render(url: string, manifest: any) {
  const { app, router, store } = createApp();
  await router.push(url);
  await router.isReady();
  //匹配到的所有路由组件
  const matchHedComponents = router.currentRoute.value.matched.flatMap(
    (record) => Object.values(record.components) // console.log(record,'------')
  );
  await Promise.all(
    // asyncData方法执行成功后要有返回,Promise.all都返回成功/活有败后才能执行
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
  const ctx:any = {}

  const appHtml = await renderToString(app, ctx)
  const state = store.state;
  if (import.meta.env.PROD) {
    const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
    return { appHtml, state, preloadLinks };
  } else {
    return { appHtml, state };
  }

  function renderPreloadLinks(modules: any, manifest: any) {
    console.log(modules, "-------------------modules")
    // let links = "";
    // const seen = new Set();
    // modules.forEach((id: any) => {
    //   const files = manifest[id];
    //   if (files) {
    //     files.forEach((file: any) => {
    //       if (!seen.has(file)) {
    //         seen.add(file);
    //         const filename = basename(file);
    //         if (manifest[filename]) {
    //           for (const depFile of manifest[filename]) {
    //             links += renderPreloadLink(depFile);
    //             seen.add(depFile);
    //           }
    //         }
    //         links += renderPreloadLink(file);
    //       }
    //     });
    //   }
    // });
    // return links;
    let links = "";
    modules.forEach((id: any) => {
      const files = manifest[id];
      if (files) {
        files.forEach((file: any) => {
          links += renderPreloadLink(file);
        });
      }
    });
    return links;
  }
  function renderPreloadLink(file: any) {
    if (file.endsWith(".js")) {
      return `<link rel="modulepreload" crossorigin href="${file}">`;
    } else if (file.endsWith(".css")) {
      return `<link rel="stylesheet" href="${file}">`;
    } else if (file.endsWith(".woff")) {
      return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
    } else if (file.endsWith(".woff2")) {
      return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
    } else if (file.endsWith(".gif")) {
      return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
    } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
      return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
    } else if (file.endsWith(".png")) {
      return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
    } else {
      // TODO
      return "";
    }
  }
}
