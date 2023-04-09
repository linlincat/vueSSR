<template>
  <div>
    <button @click="goto">goto</button>
  </div>
</template>
<script setup lang='ts'>
import { useRouter } from 'vue-router';

const emit = defineEmits(['goto'])
const router = useRouter()

const goto = () => {
  router.push({path: 'home', query: {name: new Date().getTime()}})
  // emit('goto',)
}
</script>
<style scoped></style>
