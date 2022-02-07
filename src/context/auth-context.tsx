import React, { ReactNode, useCallback } from 'react'
import * as auth from 'auth-provider'
import type { User } from 'types/user'
import { FullPageLoading, FullPageErrorFallback } from 'components/lib'
import { useMount } from 'utils'
import { http } from 'utils/http'
import { useAsync } from 'utils/use-async'
import { useQueryClient } from 'react-query'
interface AuthForm {
  username: string
  password: string
}

const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  // token保持登录状态
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

const AuthContext = React.createContext<
  | {
      user: User | null
      register: (form: AuthForm) => Promise<void>
      login: (form: AuthForm) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined
>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isIdle,
    isLoading,
    isError,
    setData: setUser,
    run
  } = useAsync<User | null>()

  // Access the client
  const queryClient = useQueryClient()

  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () =>
    auth.logout().then(() => {
      setUser(null)
      queryClient.clear()
    })

  useMount(
    useCallback(() => {
      run(bootstrapUser())
    }, [])
  )

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
