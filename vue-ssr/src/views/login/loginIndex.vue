<script setup lang='ts'>
import { useRouter } from "vue-router";
import type { TabsPaneContext, FormInstance } from 'element-plus'
import useFromProperties from '@/composables/login/useFormProperties'
import useFormOperates from '@/composables/login/useFormOperates'
import { useI18n, } from "vue-i18n";

const router = useRouter();
// 国际化
const { t } = useI18n()
const { ruleForm, loginText, activeName, ruleFormRef, rules } = useFromProperties(t)
const { userRegister, userLoginFn } = useFormOperates(router, ruleForm)

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
        userLoginFn(ruleForm)
      }
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
