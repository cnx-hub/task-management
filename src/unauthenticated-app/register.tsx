import React from 'react'
import { Form, Input } from 'antd'

import { LongButton } from 'unauthenticated-app'

import { useAuth } from 'context/auth-context'
import { useAsync } from 'utils/use-async'

export default function RegisterScreen({
  onError
}: {
  onError: (err: Error) => void
}) {
  const { register } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  const handleSubmit = async ({
    username,
    password,
    cpassword
  }: {
    username: string
    password: string
    cpassword: string
  }) => {
    if (cpassword !== password) {
      onError(new Error('请确认两次输入的密码相同'))
      return
    }
    try {
      await run(register({ username, password }))
    } catch (error: any) {
      onError(error)
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
        <Input placeholder={'密码'} type={'password'} id={'password'} />
      </Form.Item>
      <Form.Item
        name={'cpassword'}
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input placeholder={'密码'} type={'password'} id={'cpassword'} />
      </Form.Item>
      <Form.Item>
        <LongButton type={'primary'} htmlType="submit">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  )
}
