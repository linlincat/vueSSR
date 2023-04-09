// 200 成功, 01 数据存在, 02 密码不正确, 03 手机号不正确, 04 其它, 05 登录过期

import { getQueryCookie } from "@/utils";
import { IResult } from "../index";
import { ElLoading } from "element-plus";
import DB from "../../db";

// interface any {
//   code: string;
//   userId?: string | number;
// }

const stroeName = Object.keys(DB.userObjectStore)[0];

// 用户登录
export async function userLogin(params: any) {
  const loading = ElLoading.service({
    lock: true,
    background: "rgba(0, 0, 0, 0.1)",
  });
  // 手机号于密码是否正确
  const correct: any = await new Promise((resolve, reject) => {
    DB.indexDB.getList(stroeName).then((res: any) => {
      setTimeout(() => {
        loading.close();
      }, 200);
      res &&
        res.filter((item: any) => {
          if (
            item.mobile === params.mobile &&
            item.password !== params.password
          ) {
            resolve({ code: "02" });
          }
          if (
            item.mobile !== params.mobile &&
            item.password == params.password
          ) {
            resolve({ code: "03" });
          }
          if (
            item.mobile === params.mobile &&
            item.password === params.password
          ) {
            resolve({ code: "200", userId: item.userId });
          }
        });
      resolve({ code: "04" });
    });
  });
  let result: IResult;

  if (correct.code !== "200") {
    result = await new Promise((resolve, reject) => {
      resolve({
        code: correct.code,
        success: false,
        message:
          correct.code === "02"
            ? "数据不正确"
            : correct.code === "03"
            ? "手机号不正确"
            : "其它",
        result: null,
      });
    });
  } else {
    const token = new Date().getTime() + "";
    document.cookie = `token=${token}`;
    const obj = { status: 1, userId: correct.userId, token };
    Object.assign(params, obj);
    result = await new Promise((resolve, reject) => {
      DB.indexDB.updateItem(stroeName, params).then((res) => {
        setTimeout(() => {
          loading.close();
        }, 200);
        resolve({
          code: "200",
          success: true,
          message: "操作成功",
          result: obj,
        });
      });
    });
  }
  return result;
}
// 用户退出
export async function userLogout() {
  const loading = ElLoading.service({
    lock: true,
    background: "rgba(0, 0, 0, 0.1)",
  });
  // 更改用户登录状态 0
  const correct: any = await new Promise((resolve, reject) => {
    DB.indexDB.getList(stroeName).then((res: any) => {
      setTimeout(() => {
        loading.close();
      }, 200);
      res &&
        res.filter((item: any) => {
          const cookie = document.cookie;
          const token = getQueryCookie(cookie, "token");
          if (item.token && item.token.indexOf(token) !== -1) {
            resolve({ code: "200", userId: item.userId });
          }
        });
      resolve({ code: "05" });
    });
  });

  let result: IResult;
  if (correct.code === "05") {
    result = await new Promise((resolve, reject) => {
      resolve({
        code: "05",
        success: false,
        message: "登录过期",
        result: null,
      });
    });
  } else {
    const params: any = await new Promise((resolve, reject) => {
      DB.indexDB.getItem(stroeName, correct.userId!).then((res) => {
        resolve(res);
      });
    });
    const obj = { status: 0, token: null };
    Object.assign(params, obj);
    result = await new Promise((resolve, reject) => {
      DB.indexDB.updateItem(stroeName, params).then((res) => {
        setTimeout(() => {
          loading.close();
        }, 200);
        resolve({
          code: "200",
          success: true,
          message: "操作成功",
          result: null,
        });
      });
    });
  }
  return result;
}

// 用户注册
export async function userSign(params: any) {
  const loading = ElLoading.service({
    lock: true,
    background: "rgba(0, 0, 0, 0.1)",
  });
  // 是否有相同的手机号
  const hasMobile = await new Promise((resolve, reject) => {
    DB.indexDB.getList(stroeName).then((res: any) => {
      setTimeout(() => {
        loading.close();
      }, 200);
      res &&
        res.filter((item: any) => {
          if (item.mobile === params.mobile) {
            resolve(true);
          }
        });
      resolve(false);
    });
  });

  let result: IResult;
  if (hasMobile) {
    result = await new Promise((resolve, reject) => {
      resolve({
        code: "01",
        success: false,
        message: "数据已经存在",
        result: null,
      });
    });
  } else {
    const obj = { status: 0 };
    Object.assign(params, obj);
    result = await new Promise((resolve, reject) => {
      DB.indexDB.updateItem(stroeName, params).then((res) => {
        setTimeout(() => {
          loading.close();
        }, 200);
        resolve({
          code: "200",
          success: true,
          message: "操作成功",
          result: null,
        });
      });
    });
  }
  return result;
}
