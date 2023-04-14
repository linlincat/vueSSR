<script setup lang="ts">

import { useStore } from '@/store';
import { useRoute } from 'vue-router'
import CommonHeader from '@/components/layout/commonHeader.vue'
/**
 * 官网提供的element-plus/es/dist/lang路径没有type类型描述
 * 引入国际化element-plus/es/locale/lang
 */
// import zhCn from "element-plus/es/locale/lang/zh-cn";
// import en from "element-plus/es/locale/lang/en";
// import { ref } from 'vue';
// import { useI18n } from 'vue-i18n'
import CommonFooter from './components/layout/commonFooter.vue';
import { key } from './store';
// const value2 = ref('');
// const locale = ref(zhCn);
/**
 * locale是createI18n下的locale
 * locale.value是修改ele组件内部的国际化
 * localeLanguage修改的是自定义配置的国际化- 修改locale: "en|zh",
 * 在通过useI18n获取到message下的对应国际化信息
 */
// const { locale: localeLanguage } = useI18n();
// const changeLang = (lang: any) => {
//   locale.value = lang
//   // 进入页面拿到的是定义的默认语言,异步请求有延迟
//   // 子组件拿到的数据也是默认语言
//   localeLanguage.value = lang.name
// }

// 定义的阶段route 拿到的fullPath是 ‘/’
// 当页面组件加载完成后才能真正的拿到当前的路由路径
const route = useRoute()
const store = useStore()
</script>

<template>
  <!-- 国际化标签 -->
  <!-- :locale ele组件国际化 -->
  <el-config-provider :locale="store.state.locale">
    <!-- 公共头部 -->
    <CommonHeader v-show="route.fullPath.indexOf('login') === -1" @changeLang="changeLang" />
    <!-- 主体 -->
    <div class="container">
      <router-view></router-view>
    </div>
    <!-- 公共底部 -->
    <CommonFooter v-show="route.fullPath.indexOf('login') === -1" />
  </el-config-provider>
</template>

<style scoped lang="scss">
.container {
  min-height: calc(100vh - 160px);
}
</style>
