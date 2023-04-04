import { defineConfig } from "vite";
// 按需引入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 按需引入
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    // 按需引入
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // 路径别名
    },
    extensions: [".js", ".json", ".ts"], // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  // reprocessOptions
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/variable.scss";',
      },
    },
  },

  // base: "./",
  // resolve: {
  //   // 配置别名
  //   alias: [
  //     { find: "@", replacement: path.resolve(__dirname, "src") },
  //     // { find: "@api", replacement: path.resolve(__dirname, "src/api") },
  //   ],
  // },
});
