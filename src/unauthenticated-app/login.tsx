import React from 'react'
import { Form, Input } from 'antd'

import { LongButton } from 'unauthenticated-app'
import { useAuth } from 'context/auth-context'
import { useAsync } from 'utils/use-async'

export default function LoginScreen({
  onError
}: {
  onError: (error: Error) => void
}) {
  const { login } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  // HTMLFormElement extends Element
  const handleSubmit = async (values: {
    username: string
    password: string
  }) => {
    try {
      await run(login(values))
    } catch (err: any) {
      err.message = '用户名或密码不正确'
      onError(err)
    }
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={'username'}
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder={'用户名'} type="text" id={'username'} />
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input type={'password'} placeholder={'密码'} id={'password'} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type="primary">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  )
}
