<script setup lang='ts'>

import { reactive, ref, getCurrentInstance } from 'vue';
import type { TabsPaneContext, FormInstance, FormRules } from 'element-plus'
// import { useRouter, useRoute } from 'vue-router'
import { useI18n, } from "vue-i18n";
import { IResult } from '@/api';
import { userLogin, userSign } from '@/api/login'
import { useRouter } from 'vue-router';

const router = useRouter()
// 国际化
const { proxy }: any = getCurrentInstance();
const { t } = useI18n()
const activeName = ref("login")
const loginText = ref(t(`login.button`))
const ruleFormRef = ref<FormInstance>()
interface IruleFrom {
  mobile: string;
  password: string;
}
const ruleForm = reactive<IruleFrom>({
  mobile: '',
  password: ''
})
const rules = reactive<FormRules>({
  mobile: [{ required: true, min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入正确的密码', trigger: 'blur' }],
})
// 切换登录页面的登录/注册按钮文本
const handleClick = (tab: TabsPaneContext, event: Event) => {
  if (tab.props.name === 'login') {
    loginText.value = t(`login.button`)
  } else if (tab.props.name === 'register') {
    loginText.value = t(`login.buttons`)
  }
}
// 登录/注册提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if (activeName.value === 'register') {
        userRegister(ruleForm)
      } else if (activeName.value === 'login') {
        toRserLogin(ruleForm)
      }
    } else {
      return false
    }
  })
}

// 注册
function userRegister(params: IruleFrom) {
  userSign(params).then((res: IResult) => {
    const { success, message } = res
    if (success) { proxy.$message.success(message) }
    else {
      proxy.$message.error(message)
    }
  })
}

// 登录
function toRserLogin(params: IruleFrom) {
  userLogin(params).then((res: IResult) => {
    const { success, message, result } = res
    if (success) {
      localStorage.setItem('useStatus', result.status)
      router.push({ name: 'home' })
      proxy.$message.success(message)
    }
    else {
      proxy.$message.error(message)
    }
  })
}
// 退出
</script>
<template>
  <div class="login_page">
    <div class="title">{{ t(`login.title`) }}</div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane :label="t(`login.topLeft`)" name="login"></el-tab-pane>
      <el-tab-pane :label="t(`login.topRight`)" name="register"></el-tab-pane>
    </el-tabs>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <el-form-item prop='mobile'>
        <el-input :placeholder="t(`login.pTop`)" v-model="ruleForm.mobile" />
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
