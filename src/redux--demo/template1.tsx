import React from 'react'
import { connect } from 'react-redux'

// 类型
import { Dispatch } from 'redux'
import { rootState } from '../store'
import { ICounterAction } from '../store/count'
import { Ihome } from '../store/home'

interface IProps {
  home: Ihome
  counter: number
  changeCounter: () => void
}
// 返回React.FC<IProps>  => (props:IProps):JSX.Element
function Template1(props: IProps) {
  function changeCounter() {
    props.changeCounter()
  }
  return (
    <div>
      <h1>{props.counter}</h1>
      <button onClick={(e) => changeCounter()}>改变</button>
    </div>
  )
}

const mapStateToProps = (state: rootState) => ({
  ...state.home,
  ...state.counter
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeCounter: () => {
    dispatch({
      type: ICounterAction.CHANGECOUNTER,
      payload: { counter: 1 }
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Template1)
