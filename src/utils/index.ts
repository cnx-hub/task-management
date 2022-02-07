// import { useDebounce } from './index';
import { useRef, useEffect, useState } from 'react'
export const isFalsy = (value: unknown) => (value === 0 ? false : !value)
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === ''

export const useDocumentTitle = (title: string, keepOnUnmount = true): void => {
  const oldTitle = useRef(document.title).current

  // 页面加载时: 旧title
  // 加载后：新title
  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      // 如果不指定依赖，读到的就是旧title
      if (!keepOnUnmount) {
        document.title = oldTitle
      }
    }
  }, [keepOnUnmount, oldTitle])
}

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  })

  return mountedRef
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [callback])
}

/**
 * 自定义useDebounce hook
 * 用泛型规范
 */
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    // 每次在上一个useEffect处理完之后再执行
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debouncedValue
}

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray)
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value]
      copy.splice(index, 1)
      setValue(copy)
    }
  }
}

/**
 * 在一个函数里，改变传入的对象本身是不好的
 */
export const cleanObject = (object?: { [key: string]: unknown }) => {
  if (!object) {
    return {}
  }
  const result = { ...object }
  Object.keys(object).forEach((key) => {
    const value = object[key]

    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}
