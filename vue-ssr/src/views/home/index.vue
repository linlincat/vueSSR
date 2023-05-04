
<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { useStore } from '@/store';
export default defineComponent({
  setup() {
    const stroe = useStore()
    return { stroe }
  },
  asyncData({ store, route }: any) {
    return store.dispatch("getListData")  // 加不加return目前看不出区别
  },
})
// onMounted(() => {
//   axios.get('../../../public/json').then(res => {
//   console.log(res.data, '====')
//   })
// })

</script>
<template>
  <div class="container">
    <div class="banner">我是一个广告位</div>
    <div style="width: 1200px; margin: 0 auto;">
      <h2 class="title">我是一个标题</h2>
      <ul class="list">
        <li v-for="(item, index) in stroe.state.listData" :key="index">
          <div>背景颜色</div>
          <span>{{item.word}}</span>
        </li>
        
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 将;放到啦“”内部,导致控制台报错找不到文件
@import "@/assets/scss/home/index.scss";
</style>

