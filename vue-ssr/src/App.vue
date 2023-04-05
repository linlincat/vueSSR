<script setup lang="ts">
import { useRouter } from 'vue-router'
/**
 * 官网提供的问题没有type类型描述 
 * 引入国际化
 */
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
const value2 = ref('');
const locale = ref(zhCn);
const { locale: localeLanguage } = useI18n();
// function changeLang() {}
const changeLang = (lang: any) => {
  locale.value = lang
  localeLanguage.value = lang.name
}

const router = useRouter()
</script>

<template>
  <!-- 国际化标签 -->
  <!-- :locale ele组件国际化 -->
  <el-config-provider :locale="locale">
    <el-date-picker v-model="value2" type="date" placeholder="lll" />
    <el-button @click="changeLang(zhCn)">中文</el-button>
    <el-button @click="changeLang(en)">英文</el-button>
    <el-button @click="() => router.push({ path: '/home' })">home</el-button>
    <el-button @click="() => router.push({ path: '/myCenter' })">myCenter</el-button>
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
