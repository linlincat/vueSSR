<script setup lang="ts">
import { apiHomeList } from '@/api/index'
import { useI18n, } from "vue-i18n";
apiHomeList()
const { t } = useI18n()
</script>
<template>
  <div>{{ t(`message.home`) }}</div>
</template>

<style lang="scss" scoped>
// 将;放到啦“”内部,导致控制台报错找不到文件
@import "@/assets/scss/home/index.scss";
</style>

