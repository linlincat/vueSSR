<script setup lang='ts'>

import { reactive, ref } from 'vue';
import type { TabsPaneContext, FormInstance, FormRules } from 'element-plus'
// import { useRouter, useRoute } from 'vue-router'
import { useI18n, } from "vue-i18n";
// 国际化
const { t } = useI18n()
const activeName = ref("login")
const loginText = ref(t(`login.button`))
const ruleFormRef = ref<FormInstance>()
  interface IruleFrom {
  tel: string;
  password: string;
}
const ruleForm = reactive<IruleFrom>({
  tel: '',
  password: ''
})
const rules = reactive<FormRules>({
  tel: [{ required: true, min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入正确的密码', trigger: 'blur' }],
})
// 
const handleClick = (tab: TabsPaneContext, event: Event) => {
  if (tab.props.name === 'login') {
    loginText.value = t(`login.button`)
  } else if (tab.props.name === 'register') {
    loginText.value = t(`login.buttons`)
  }
}
// 
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
    } else {
      return false
    }
  })
}
</script>
<template>
  <div class="login_page">
    <div class="title">{{ t(`login.title`) }}</div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane :label="t(`login.topLeft`)" name="login"></el-tab-pane>
      <el-tab-pane :label="t(`login.topRight`)" name="register"></el-tab-pane>
    </el-tabs>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <el-form-item prop='tel'>
        <el-input :placeholder="t(`login.pTop`)" v-model="ruleForm.tel" />
      </el-form-item>
      <el-form-item prop='password'>
        <el-input :placeholder="t(`login.pBottom`)" v-model="ruleForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%;" type="primary" @click="submitForm(ruleFormRef)">{{ loginText }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.title {
  color: white;
  text-shadow: 5px 5px 5px #66a6ff;
  font-size: 40px;
  line-height: 80px;
}

.login_page {
  padding: 30px;
  padding-bottom: 50px;
  background-color: #f1f1f1;
  width: 500px;
  margin: 40px auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
