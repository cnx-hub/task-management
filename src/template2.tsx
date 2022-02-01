import React, { Dispatch } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { rootState } from './store'
import { ICounterAction, ICountState } from './store/count'
import { IhomeState } from './store/home'

export default function Template2() {
  // 使用hooks结合redux
  //   第一个类型为state的类型  第二个类型为返回值类型
  //   shallowEqual性能优化
  const { counter } = useSelector<rootState, ICountState>(
    (state: rootState) => state.counter,
    shallowEqual
  )
  const { home } = useSelector<rootState, IhomeState>(
    (state: rootState) => state.home,
    shallowEqual
  )

  const dispatch = useDispatch<Dispatch<any>>()

  const changeCounter = () => {
    dispatch({
      type: ICounterAction.CHANGECOUNTER,
      payload: { counter: 1 }
    })
  }

  console.log(counter, home)
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={changeCounter}>改变</button>
    </div>
  )
}
