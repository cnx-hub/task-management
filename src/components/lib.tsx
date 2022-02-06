import styled from 'styled-components'
import { DevTools } from 'jira-dev-tool'
import { Typography, Spin } from 'antd'

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
  <FullPage>
    <DevTools />
    <ErrorBox error={error}></ErrorBox>
  </FullPage>
)
// 类型守卫
const isError = (value: any): value is Error => value?.message // is类型 表示 value是一个Error 需返回一个boolean

export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    console.log(error)

    return <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
  }
  return null
}

export const FullPageLoading = () => (
  <FullPage>
    <Spin size="large"></Spin>
  </FullPage>
)

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
