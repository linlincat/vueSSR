<script setup lang="ts">

import { getLanguage, IResult } from '@/api/index'
import { ref, defineEmits, defineProps, onMounted, getCurrentInstance } from 'vue';
import zhCn from "element-plus/es/locale/lang/zh-cn"
import en from 'element-plus/es/locale/lang/en'

import { useI18n, } from "vue-i18n";
import router from '@/router';
import { userLogout } from '@/api/login';
import { useStore } from '@/store';


const { proxy }: any = getCurrentInstance()
const store = useStore()

onMounted(() => {
  // 不管用,虽然能改变执行顺序,但是这个时候没有创建打开数据库,直接调用方法是提示没有改方法的;
  // setTimeout(()=>{toGetLanguage()},2000)
})
const activeIndex = ref("orders")
const emit = defineEmits<{
  (e: 'changeLang', lang: any): void
}>()
const { t, locale: localeLanguage } = useI18n();
function handleSelect(e: any) {
  if (e === 'zh') {
    // 通知组件修改国际化
    // emit('changeLang', zhCn)
    // 本地保存国际化
    store.dispatch("toSaveLangeuage", zhCn)
    localeLanguage.value = e
    // toSaveLangeuage('zh')
  } else if (e === 'en') {
    // emit('changeLang', en)
    // toSaveLangeuage('en')
    store.dispatch("toSaveLangeuage", en)
    localeLanguage.value = e
  } else if (e === 'login') {
    router.push({
      name: 'login'
    })
  } else if (e === 'logout') {
    doUserLogout()
  }
}
// 保存国际化
// function toSaveLangeuage(lang: any) {
//   saveLangeuage(lang).then(res => {
//     const { success } = res;
//     success ? console.log('保存国际化语言成功') : console.log('保存国际化语言失败')
//   })
// }
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
      // localStorage.setItem("useStatus", "0")
      store.commit("setUserStatus", 0)
    }
    else {
      proxy.$message.error(message)
    }
  })
}
</script> 

<template>
  <div class="common-header">
    <img class="logo" src="@/assets/imgs/layout/z01.jpg" alt="logo" />
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="orders">{{ t(`header.order`) }}</el-menu-item>
      <el-menu-item index="records">{{ t(`header.record`) }}</el-menu-item>
      <el-sub-menu index="language">
        <template #title>{{ t(`header.language`) }}</template>
        <el-menu-item index="zh">中文</el-menu-item>
        <el-menu-item index="en">English</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="avatar" v-if="store.state.userStatus === 1">
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
