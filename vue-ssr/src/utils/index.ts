// 返回指定的cookie,查询不到返回 ""
export function getQueryCookie(cookie: any, key: any) {
  const cookieList = cookie.split(";");
  let token;
  for (let i = 0; i < cookieList.length; i++) {
    token = cookieList[i].split("=");
    if (key === token[0].trim()) {
      return token[1];
    }
  }
  return "";
}
