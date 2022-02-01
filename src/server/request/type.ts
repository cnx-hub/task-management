import { AxiosRequestConfig, AxiosResponse } from 'axios'

// 创建一个interceptors函数的接口
export interface NXrequestInterceptors<T = AxiosResponse>
  extends AxiosRequestConfig {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responsetInterceptor?: (config: T) => T
  responseInterceptorCatch?: (err: any) => any
}
