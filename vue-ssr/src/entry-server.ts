// 在服务端渲染
import { basename } from "node:path";
import { createApp, asyncDatgaFilter } from "./main";
import { renderToString } from "vue/server-renderer";

export async function render(url: string, manifest: any) {
  const { app, router, store } = createApp();
  await router.push(url);
  await router.isReady();
  //匹配到的所有路由组件
  const matchHedComponents = router.currentRoute.value.matched.flatMap(
    (record) => Object.values(record.components) // console.log(record,'------')
  );
  await asyncDatgaFilter(matchHedComponents, store, router.currentRoute);
  const ctx: any = {};

  const appHtml = await renderToString(app, ctx);
  const state = store.state;
  if (import.meta.env.PROD) {
    const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
    return { appHtml, state, preloadLinks };
  } else {
    return { appHtml, state };
  }

  function renderPreloadLinks(modules: any, manifest: any) {
    console.log(modules, "-------------------modules");
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
