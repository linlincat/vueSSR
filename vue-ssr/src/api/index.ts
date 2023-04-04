import { http } from "@/utils/http";

export function apiHomeList() {
  return http.httpGet("url", {});
}
