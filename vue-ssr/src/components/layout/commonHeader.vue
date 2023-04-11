<script setup lang="ts">

import { getLanguage, IResult, saveLangeuage } from '@/api/index'
import { ref, defineEmits, defineProps, onMounted, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import zhCn from "element-plus/es/locale/lang/zh-cn"
import en from 'element-plus/es/locale/lang/en'

import { useI18n, } from "vue-i18n";
import router from '@/router';
import { userLogout } from '@/api/login';

const { proxy }: any = getCurrentInstance()
const status = localStorage.getItem("useStatus")
const store = useStore()
// 国际化
const { t } = useI18n()

onMounted(() => {
  // toGetLanguage()
})
const activeIndex = ref("orders")
const emit = defineEmits<{
  (e: 'changeLang', lang: any): void
}>()
function handleSelect(e: any) {
  if (e === 'zh') {
    // 通知组件修改国际化
    emit('changeLang', zhCn)
    // 本地保存国际化
    toSaveLangeuage('zh')
  } else if (e === 'en') {
    emit('changeLang', en)
    toSaveLangeuage('en')
  } else if (e === 'login') {
    router.push({
      name: 'login'
    })
  } else if (e === 'logout') {
    doUserLogout()
  }
}
// 保存国际化
function toSaveLangeuage(lang: any) {
  saveLangeuage(lang).then(res => {
    const { success } = res;
    success ? console.log('保存国际化语言成功') : console.log('保存国际化语言失败')
  })
}
// 获取国际化
function toGetLanguage() {
  getLanguage().then(res => {
    const { success, result } = res;
    const { name } = result;
    if (success) {
      if (name === 'zh') {
        // 通知组件修改国际化
        emit('changeLang', zhCn)
      } else if (name === 'en') {
        emit('changeLang', en)
      }
    }
  })
}
function doUserLogout() {
  userLogout().then((res: IResult) => {
    const { success, message } = res
    if (success) {
      router.push({ name: 'login' })
      proxy.$message.success(message)
      localStorage.setItem("useStatus", "0")
    }
    else {
      proxy.$message.error(message)
    }
  })
}
</script> 

<template>
  <div class="common-header">
    {{ store.state.count }}
    <img class="logo" src="@/assets/imgs/layout/z01.jpg" alt="logo" />
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="orders">{{ t(`header.order`) }}</el-menu-item>
      <el-menu-item index="records">{{ t(`header.record`) }}</el-menu-item>
      <el-sub-menu index="language">
        <template #title>{{ t(`header.language`) }}</template>
        <el-menu-item index="zh">中文</el-menu-item>
        <el-menu-item index="en">English</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="avatar" v-if="status === '1'">
        <template #title> <img class="avatar" src="@/assets/imgs/layout/z02.jpg" alt="center" /></template>
        <el-menu-item index="logout">退出</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="login" v-else>
        {{ t(`login.button`) }}/{{ t(`login.buttons`) }}
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/scss/layout/headerAndFooter.scss";
</style>
