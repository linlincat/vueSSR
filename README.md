# vueSSR
vue3+nuxt3/实现的SSR服务端渲染
# 过程笔记
〉 defineProps|defineEmits的用法
```
// 非TS 
const props = defineProps({
  foo: String
})
const emit = defineEmits(['change', 'delete'])
// TS 
const props = defineProps<{
  foo: string
  bar?: number
}>()
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
```
