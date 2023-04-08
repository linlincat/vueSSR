<script setup lang="ts">
import { useRouter } from 'vue-router'
import CommonHeader from '@/components/layout/commonHeader.vue'
/**
 * 官网提供的element-plus/es/dist/lang路径没有type类型描述
 * 引入国际化element-plus/es/locale/lang
 */
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
import CommonFooter from './components/layout/commonFooter.vue';
// const value2 = ref('');
const locale = ref(zhCn);
/**
 * locale是createI18n下的locale
 * locale.value是修改ele组件内部的国际化
 * localeLanguage修改的是自定义配置的国际化- 修改locale: "en|zh",
 * 在通过useI18n获取到message下的对应国际化信息
 */
const { locale: localeLanguage } = useI18n();
const changeLang = (lang: any) => {
  locale.value = lang
  localeLanguage.value = lang.name
}

// const router = useRouter()
</script>

<template>
  <!-- 国际化标签 -->
  <!-- :locale ele组件国际化 -->
  <el-config-provider :locale="locale">
    <!-- 公共头部 -->
    <CommonHeader @changeLang="changeLang" />
    <!-- 主体 -->
    <div class="container">
      <router-view></router-view>
    </div>
    <!-- 公共底部 -->
    <CommonFooter />
  </el-config-provider>
</template>

<style scoped lang="scss">
.container {
  min-height: calc(100vh - 160px);
}
</style>
