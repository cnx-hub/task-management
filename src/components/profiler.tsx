import React, { ProfilerOnRenderCallback, ProfilerProps } from 'react'

type Props = { metadata?: any; phases?: ('mount' | 'update')[] } & Omit<
  ProfilerProps,
  'onRender'
>

// 记录看板页面下所有组件渲染的效率
let queue: unknown[] = []

const sendProfileQueue = () => {
  if (!queue.length) {
    return
  }
  const queueToSend = [...queue]
  queue = []
  console.log(queueToSend)
}

setInterval(sendProfileQueue, 5000)

// 用于测量一个 React 应用多久渲染一次以及渲染一次的“代价”
export const Profiler = ({ metadata, phases, ...props }: Props) => {
  const reportProfile: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
  ) => {
    if (!phases || phases.includes(phase)) {
      queue.push({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
        metadata
      })
    }
  }
  return <React.Profiler onRender={reportProfile} {...props} />
}
