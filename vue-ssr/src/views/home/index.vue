<script setup lang="ts">
import { apiHomeList } from '@/api/index'
import { useI18n, } from "vue-i18n";
import IndexDB from '../../utils/indexDB'
apiHomeList()
const { t } = useI18n()

const db = new IndexDB("demo")
db.openStore('elephant', 'id', ['nose', 'ear'])

// add 
const addDB = (storeName: string) => {
  db.updateItem(
    storeName, {
    she: 'nv',
    he: 'nan'
  }
  )
}
// del 
const delDB = (storeName: string, key: number | string) => {
  db.deleteItem(
    storeName, key
  )
}
// find
const findDB = (storeName: string) => {
  db.getList(
    storeName
  )
}
// findOne
const findOneDB = (storeName: string, key: number | string) => {
  db.getItem(
    storeName, key
  )
}
</script>
<template>
  <div></div>
  <div></div>
  <div></div>
  <button @click="addDB('elephant')">add</button>
  <button @click="delDB('elephant', 2)">del</button>
  <button @click="findDB('elephant')">find</button>
  <button @click="findOneDB('elephant', 3)">findOne</button>
  <div>{{ t(`message.home`) }}</div>
</template>

<style lang="scss" scoped>
// 将;放到啦“”内部,导致控制台报错找不到文件
@import "@/assets/scss/home/index.scss";
</style>

