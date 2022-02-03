import React, { PureComponent } from 'react'

type FallbackRender = (props: { error: Error | null }) => React.ReactElement

export default class ErrorBoundary extends PureComponent<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  constructor(
    props: React.PropsWithChildren<{ fallbackRender: FallbackRender }>
  ) {
    super(props)

    this.state = {
      error: null
    }
  }
  // 子组件出错时会调用这个额生命周期
  static getDerivedStateFromError(error: Error) {
    // 更新state中的状态
    return { error }
  }

  render() {
    const { error } = this.state
    // children 相当于插槽
    const { fallbackRender, children } = this.props
    if (error) {
      fallbackRender({ error })
    } else {
      return children
    }
  }
}
