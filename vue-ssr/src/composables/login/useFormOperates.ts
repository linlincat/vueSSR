import { getCurrentInstance } from "vue";
import { userLogin, userSign } from "@/api/login";
import { IResult } from "@/api";
import { Router } from "vue-router";
interface IruleFrom {
  mobile: string;
  password: string;
}
export default function useFormOperates(router: Router, params: any) {
  const { proxy }: any = getCurrentInstance();
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
      if (success) {
        localStorage.setItem("useStatus", result.status);
        router.push({ name: "home" });
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
