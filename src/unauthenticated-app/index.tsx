import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { Card, Divider, Button } from 'antd'

import left from 'assets/left.svg'
import right from 'assets/right.svg'
import logo from 'assets/logo.svg'
import { ErrorBox } from 'components/lib'
import { useDocumentTitle } from 'utils'
import LoginScreen from 'unauthenticated-app/login'
import RegisterScreen from 'unauthenticated-app/register'

export default function UnauthenticatedApp() {
  const [isRegister, setIsRegister] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useDocumentTitle('task-management')

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isRegister ? '请注册' : '请登录'}</Title>
        <ErrorBox error={error} />
        {isRegister ? (
          <RegisterScreen onError={setError} />
        ) : (
          <LoginScreen onError={setError} />
        )}
        <Divider />
        <LongButton type={'link'} onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? '已经有账号了？直接登录' : '没有账号？注册新账号'}
        </LongButton>
      </ShadowCard>
    </Container>
  )
}

export const LongButton = styled(Button)`
  width: 100%;
`

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 14rem;
  width: 100%;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`
