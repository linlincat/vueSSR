import { http } from "@/utils/http";
import DB from "../utils/indexDB";
import IndexDB from "../utils/indexDB";

const db = new IndexDB("demo");
interface IResult {
  code: string;
  message: string;
  result: any;
  success: boolean;
}

export async function apiHomeList() {
  const res = await http.httpGet("../../public/json", {});
  console.log(res);
}
// 设置语言包
export async function saveLangeuage(lang: any) {
  await db.openStore("lang", "id", ["name"]);
  const resultS: IResult = await db.getItem("lang", 1).then((res: any) => {
    console.log(res, "this init get res");
    return {
      code: "200",
      message: "success",
      result: res || null,
      success: true,
    };
  });
  console.log(resultS, "this init get res");
  // 做的是更新所以写死为true
  const { success } = resultS;
  let obj = {};
  if (success) {
    // 有数据更新
    obj = { name: lang, id: 1 };
  } else {
    // 无数据新增
    obj = { name: lang };
  }
  const result = await db.updateItem("lang", obj).then((res: any) => {
    return { code: "200", message: "success", result: null, success: true };
  });
  return result;
}
// 获取语言包
export async function getLanguage() {
  await db.openStore("lang", "id", ["name"]);
  const result: IResult = await db.getItem("lang", 1).then((res) => {
    return {
      code: "200",
      message: "success",
      result: res || null,
      success: true,
    };
  });
  return result;
}

// export async function fetchE() {
//   await db.openStore("elephant", "id", ["nose", "ear"]);
//   const result = await db.getList("elephant");
//   const results = Object.assign({result}, { code: '200', message: 'success', success: true})
//   return results;
// }
