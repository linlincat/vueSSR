<script setup lang='ts'>
import { useStore } from '@/store'
import { computed } from 'vue';
const store = useStore();
const pageNo = computed(() => store.state.pageNo)
const pageSize = computed(() => store.state.pageSize)
const tatal = computed(() => store.state.total)

function changePage(pageNo: number) {
  console.log(changePage)
}
</script>
<template>
  <el-pagination :current-page="pageNo" :page-size="pageSize" :total="tatal" background layout="prev,pager,next"
    @current-change="changePage"></el-pagination>
</template>

<style scoped></style>
