import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { cleanObject, subset } from 'utils/index'

// 获取路由的地址参数 和 设置路由地址函数
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams()
  const setSearchParams = useSetUrlSearchParam()
  const [stateKeys] = useState(keys)
  return [
    useMemo(() => {
      return subset(Object.fromEntries(searchParams), stateKeys) as {
        [key in K]: string
      }
    }, [searchParams, stateKeys]),
    (param: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(param)
    }
  ] as const
  // as const 的目的是为了导出一个 固定的对象类型{name :xxx, personId:xxx}
}

// 返回设置路由参数的函数
export const useSetUrlSearchParam = () => {
  const [searchParams, SetsearchParams] = useSearchParams()
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params
    }) as URLSearchParamsInit
    return SetsearchParams(o)
  }
}
