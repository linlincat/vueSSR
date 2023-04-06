import { http } from "@/utils/http";
import IndexDB from "../utils/indexDB";

const db = new IndexDB("demo");

export function apiHomeList() {
  return http.httpGet("../../public/json", {}).then((res: any) => {
    // debugger
    console.log(res);
  });
}

export async function fetchE() {
  await db.openStore("elephant", "id", ["nose", "ear"]);
  const result = await db.getList("elephant");
  const results = Object.assign({result}, { code: '200', message: 'success', success: true})
  return results;
}
