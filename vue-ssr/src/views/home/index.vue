<script setup lang="ts">

import { apiHomeList } from '@/api/index'
import { onMounted } from 'vue';
import { useI18n, } from "vue-i18n";
import IndexDB from '../../utils/indexDB'

// 获取indexDBmock数据
// const getE = () => {
//   fetchE().then(res => {
//     console.log(res, 'mock')
//   })
// }
onMounted(() => {
  // 本地json请求
  apiHomeList()
  // getE()
})
// 国际化
const { t } = useI18n()
// const db = new IndexDB("demo")
// db.openStore('elephant', 'id', ['nose', 'ear'])

// add 
// const addDB = (storeName: string) => {
//   db.updateItem(
//     storeName, {
//     she: 'nv',
//     he: 'nan'
//   }
//   )
// }
// del 
// const delDB = (storeName: string, key: number | string) => {
//   db.deleteItem(
//     storeName, key
//   )
// }
// find
// const findDB = (storeName: string) => {
//   db.getList(
//     storeName
//   )
// }
// findOne
// const findOneDB = (storeName: string, key: number | string) => {
//   db.getItem(
//     storeName, key
//   )
// }

</script>
<template>
  <div>
    <!-- <CommonHeader></CommonHeader> -->
  </div>
  <div></div>
  <p>sss</p>
  <button>sss</button>
  <div></div>
  <!-- <button @click="addDB('elephant')">add</button>
        <button @click="delDB('elephant', 2)">del</button>
        <button @click="findDB('elephant')">find</button>
        <button @click="findOneDB('elephant', 3)">findOne</button> -->
  <div>{{ t(`message.home`) }}</div>
</template>

<style lang="scss" scoped>
// 将;放到啦“”内部,导致控制台报错找不到文件
@import "@/assets/scss/home/index.scss";
</style>

