import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

class Http {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }
  private static axiosInstance = axios.create({
    timeout: 6000,
    baseURL: "",
  });
  // 请求拦截
  private httpInterceptorsRequest() {
    Http.axiosInstance.interceptors.request.use(
      // 跟版本有关config:AxiosRequestConfig,但是在当前使用的版本中是
      // InternalAxiosRequestConfig类型,主要是对header的一个类型改写
      (config: InternalAxiosRequestConfig) => {
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  }
  // 响应拦截
  private httpInterceptorsResponse() {
    Http.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  }

  public httpGet<T>(url: string, params: AxiosRequestConfig): Promise<T> {
    return Http.axiosInstance
      .get(url, params)
      .then((res) => res.data)
      .catch();
  }

  public httpPost<T>(url: string, data: AxiosRequestConfig): Promise<T> {
    return Http.axiosInstance
      .get(url, data)
      .then((res) => res.data)
      .catch();
  }
}

export const http = new Http();
