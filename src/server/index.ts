import NXRequest from './request'

const nxRequest = new NXRequest({
  // 根据环境变量的不同进行改变
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000, //修改
  requestInterceptor: (config) => {
    return config
  },
  requestInterceptorCatch: (err) => {
    // console.log('请求失败拦截')
    return err
  },
  responsetInterceptor: (res) => {
    // console.log('响应成功拦截')
    return res
  }
  // responseInterceptorCatch: (err) => {
  //   return err
  // }
})

export default nxRequest
