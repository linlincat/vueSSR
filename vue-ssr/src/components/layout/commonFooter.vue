<script setup lang="ts">
import { useI18n, } from "vue-i18n";
// 国际化
const { t } = useI18n()
</script>

<template>
  <div class="common-footer">
    {{t(`footer.text`)}} 
  </div>
</template>
<style scoped>
@import '@/assets/scss/layout/headerAndFooter.scss'
</style>
