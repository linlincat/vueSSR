<script setup lang="ts">
import { ElMessage, ElMessageBox, UploadProps, UploadUserFile } from 'element-plus';
import {useRoute} from 'vue-router'
import  got  from "./got.vue"
import { apiHomeList } from '@/api/index'
import { ref, watch } from 'vue';
const route = useRoute()
const activeName = ref("login")

const fileList = ref<UploadUserFile[]>([
  {
    name: 'element-plus-logo.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
  {
    name: 'element-plus-logo2.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}
const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile,"upload")
  console.log(uploadFiles,"uploadFilesuploadFiles")
  // debugger
  fileList.value = fileList.value.slice(-3)
}
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
  <el-upload
    v-model:file-list="fileList"
    :on-change="handleChange"
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    multiple
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :limit="3"
    :on-exceed="handleExceed"
  >
    <el-button type="primary">Click to upload</el-button>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500KB.
      </div>
    </template>
  </el-upload>
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

