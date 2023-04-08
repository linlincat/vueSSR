<script setup lang="ts">

import { getLanguage, saveLangeuage } from '@/api/index'
import { ref, defineEmits, defineProps, onMounted } from 'vue';
import zhCn from "element-plus/es/locale/lang/zh-cn"
import en from 'element-plus/es/locale/lang/en'

onMounted(() => {
  toGetLanguage()
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
</script>

<template>
  <div class="common-header">
    <img class="logo" src="@/assets/imgs/layout/z01.jpg" alt="logo" />
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="orders">订单中心</el-menu-item>
      <el-menu-item index="records">历史足迹</el-menu-item>
      <el-sub-menu index="language">
        <template #title>国际化切换</template>
        <el-menu-item index="zh">中文</el-menu-item>
        <el-menu-item index="en">英文</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="avatar">
        <img class="avatar" src="@/assets/imgs/layout/z02.jpg" alt="center" />
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/scss/layout/index.scss";
</style>
