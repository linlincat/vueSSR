import { http } from "@/utils/http";

export function apiHomeList() {
  return http.httpGet("../../public/json", {}).then((res: any) => {
    // debugger
    console.log(res);
  });
}
