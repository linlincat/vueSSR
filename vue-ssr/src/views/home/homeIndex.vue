
<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import HomeList from './components/homeList.vue';
export default defineComponent({
    setup() {
        const store = useStore();
        return { store };
    },
    // 在Vue3服务端渲染中，可以在setup()函数中使用asyncData()函数来实现从服务器获取数据，并在组件挂载之前将数据注入到组件中。
    // asyncData()函数接收一个对象，其中包含了store和route参数。store用于获取或设置应用程序中的状态，route则是当前路由的相关信息。
    //通过在setup()函数中使用asyncData()函数，可以确保组件在客户端和服务器端均可正常工作，并且可以确保组件在呈现时已经获得了
    // 所需的数据。这可使组件更快地呈现，并且可以为用户提供更好的体验。
    asyncData({ store, route }: any) {
        return store.dispatch("getListData"); // 加不加return目前看不出区别
    },
    components: { HomeList }
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
     <HomeList />
    </div>

  </div>
</template>

<style lang="scss">
// 将;放到啦“”内部,导致控制台报错找不到文件
@import "@/assets/scss/home/index.scss";
</style>

