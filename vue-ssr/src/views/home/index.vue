<script setup lang="ts">
import axios from 'axios';
import { onMounted } from 'vue';

onMounted(() => {
  axios.get('../../../public/json').then(res => {
  console.log(res.data, '====')
  })
})
</script>
<template>
  <div class="container">
    <div class="banner">我是一个广告位</div>
    <div style="width: 1200px; margin: 0 auto;">
      <h2 class="title">我是一个标题</h2>
      <ul class="list">
        <li>
          <div>背景颜色</div>
          <span>描述</span>
        </li>
        <li>
          <div>背景颜色</div>
          <span>描述</span>
        </li>
        <li>
          <div>背景颜色</div>
          <span>描述</span>
        </li>
        <li>
          <div>背景颜色</div>
          <span>描述</span>
        </li>
        <li>
          <div>背景颜色</div>
          <span>描述</span>
        </li>
        <li>
          <div>背景颜色</div>
          <span>描述</span>
        </li>
        <li>
          <div>背景颜色</div>
          <span>描述</span>
        </li>
        <li>
          <div>背景颜色</div>
          <span>描述</span>
        </li>
        <li>
          <div>背景颜色</div>
          <span>描述</span>
        </li>
        <li>
          <div>背景颜色</div>
          <span>描述</span>
        </li>
        <li>
          <div>背景颜色</div>
          <span>描述</span>
        </li>
        <li>
          <div>背景颜色</div>
          <span>描述</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 将;放到啦“”内部,导致控制台报错找不到文件
@import "@/assets/scss/home/index.scss";
</style>

