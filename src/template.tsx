import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

// 类型声明
import type { Dispatch } from 'react'
import type { rootState } from './store'
import { Ihome } from './store/home'
import { ICounterAction } from './store/count'

interface IProps {
  home: Ihome
  counter: number
  changeCount: () => void
}

class Template extends PureComponent<IProps> {
  constructor(props: IProps) {
    super(props)
  }

  render() {
    // console.log(this.props.changeCount)
    return (
      <div>
        <h1>{this.props.counter}</h1>
        <button onClick={(e) => this.changeCounter()}>改变</button>
      </div>
    )
  }

  changeCounter() {
    this.props.changeCount()
  }
}
const mapStateToprops = (state: rootState) => {
  return { ...state.home, ...state.counter }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  changeCount: () => {
    dispatch({
      type: ICounterAction.CHANGECOUNTER,
      payload: { counter: 1 }
    })
  }
})

export default connect(mapStateToprops, mapDispatchToProps)(Template)
