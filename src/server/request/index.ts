import axios from 'axios'

import type { AxiosInstance } from 'axios'
import type { NXrequestInterceptors } from './type'

class NXRequest {
  instance: AxiosInstance
  interceptors: NXrequestInterceptors

  constructor(config: NXrequestInterceptors) {
    this.instance = axios.create(config)
    this.interceptors = config

    // 自定义拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responsetInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 所有实例的拦截
    this.instance.interceptors.response.use(
      (res: any) => {
        return res.data
      },
      (err: any) => {
        return err
      }
    )
  }

  request<T = any>(config: NXrequestInterceptors<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 对单个请求做拦截
      if (config.requestInterceptor) {
        config = config.requestInterceptor(config)
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 对单个响应做拦截
          if (config.responsetInterceptor) {
            res = config.responsetInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T>(config: NXrequestInterceptors<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T>(config: NXrequestInterceptors<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T>(config: NXrequestInterceptors<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T>(config: NXrequestInterceptors<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default NXRequest
