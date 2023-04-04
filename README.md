# vueSSR
vue3+nuxt3/实现的SSR服务端渲染
# 技术栈使用
vue3、TS、next3、scss、axios、vue-router、elementUI-plus
# 过程笔记
> defineProps|defineEmits的用法
```
// 非TS defineProps defineProps 写法
const props = defineProps({
  foo: String
})
const emit = defineProps(['change', 'delete'])

// TS defineProps defineProps 写法
const props = defineProps<{
  foo: string
  bar?: number
}>()
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
```
