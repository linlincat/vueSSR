import { getCurrentInstance } from "vue";
import { userLogin, userSign } from "@/api/login";
import { IResult } from "@/api";
import { Router } from "vue-router";
import { useStore } from '@/store';
interface IruleFrom {
  mobile: string;
  password: string;
}
export default function useFormOperates(router: Router, params: any) {
  const { proxy }: any = getCurrentInstance();
  const store = useStore()
  // 注册
  function userRegister(params: IruleFrom) {
    userSign(params).then((res: IResult) => {
      const { success, message } = res;
      if (success) {
        proxy.$message.success(message);
      } else {
        proxy.$message.error(message);
      }
    });
  }

  // 登录
  function userLoginFn(params: IruleFrom) {
    userLogin(params).then((res: IResult) => {
      const { success, message, result } = res;
      const {status} = result
      if (success) {
        // localStorage.setItem("useStatus", result.status);
        store.commit("setUserStatus", status)
        router.push({ name: "home" });
        // 用来修复登录后页面没有加载数据的问题 window.location.href = '/home'
        
        proxy.$message.success(message);
      } else {
        proxy.$message.error(message);
      }
    });
  }

  return {
    userRegister,
    userLoginFn,
  };
}
