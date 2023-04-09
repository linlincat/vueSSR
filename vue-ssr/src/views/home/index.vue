<script setup lang="ts">
import {useRoute} from 'vue-router'
import  got  from "./got.vue"
import { apiHomeList } from '@/api/index'
import { ref, watch } from 'vue';
const route = useRoute()
const activeName = ref("login")
const handleClick = (e: any) => {
  console.log(e.props.name)
}
watch(
  route,
  (count, prevCount) => {
    console.log(count.query)
    // const ni  = count.query.name;
    const ni  = "login";
    activeName.value = ni as string
  }
)

</script>
<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="one" name="login">
      第一个位置
    </el-tab-pane>
    <el-tab-pane label="two" name="register">
      第二个位置
      <got></got>
      <!-- <button @click="goto">edit</button> -->
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped>
// 将;放到啦“”内部,导致控制台报错找不到文件
@import "@/assets/scss/home/index.scss";
</style>

