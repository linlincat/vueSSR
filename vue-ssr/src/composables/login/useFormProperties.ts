import { reactive, ref, getCurrentInstance } from "vue";
import type {  FormInstance, FormRules } from "element-plus";
interface IruleFrom {
  mobile: string;
  password: string;
}

export default function useFormProperties(t: any) {
  const { proxy }: any = getCurrentInstance();
  const activeName = ref("login");
  const loginText = ref(t(`login.button`));
  const ruleFormRef = ref<FormInstance>();
  
  const ruleForm = reactive<IruleFrom>({
    mobile: "",
    password: "",
  });
  const rules = reactive<FormRules>({
    mobile: [
      {
        required: true,
        min: 11,
        max: 11,
        message: t(`login.pTop`),
        trigger: "blur",
      },
    ],
    password: [
      { required: true, message: t(`login.pBottom`), trigger: "blur" },
    ],
  });

  return {
    proxy,
    activeName,
    loginText,
    ruleFormRef,
    ruleForm,
    rules
  }
}
