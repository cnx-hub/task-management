import { useCallback } from 'react'
import qs from 'qs'
import * as auth from 'auth-provider'
import { useAuth } from 'context/auth-context'

const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
  token?: string
  data?: object
}

export const http = (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig
  }

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      // 当登录没有携带token参数
      await auth.logout()
      window.location.reload()
      return Promise.reject({ message: '请重新登录' })
    }
    const data = await res.json()
    if (res.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

// 每次使用接口时 携带token
export const useHttp = () => {
  const { user } = useAuth()
  // utility type 的用法：用泛型给它传入一个其他类型，然后utility type对这个类型进行某种操作
  // return ([endpoint, config]: [string, Config]) => http(endpoint, {...config, token: user?.token})
  return useCallback(
    // Paramter<typeof http> === [string, Config]
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  )
}
