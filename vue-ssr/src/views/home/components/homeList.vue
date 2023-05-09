<script setup lang='ts'>
import Pagination from '@/components/common/pagination.vue';
import { useStore } from '@/store'
const store = useStore();
function clickItem(item: any) {
  console.log(item)
}
</script>
<template>
  <ul class="list">
    <li @click="clickItem(item)" v-for="(item, index) in store.state.listData" :key="index">
      <div>背景颜色</div>
      <span>{{ item.word }}</span>
    </li>
  </ul>
  <Pagination />
</template>
<style lang="scss" scoped>
// 将;放到啦“”内部,导致控制台报错找不到文件
// @import "@/assets/scss/home/index.scss";
</style>
