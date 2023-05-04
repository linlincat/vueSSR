import { createI18n } from "vue-i18n";
import en from "./en";
import zh from "./zh";

// 默认导出{ i18n }导致报错
export function createSSRI18n() {
  return createI18n({
    locale: "zh",
    legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
    allowComposition: true, // 允许组合式api
    globalInjection: true, // 全局注册$t方法
    messages: {
      zh,
      en,
    },
  });
}
