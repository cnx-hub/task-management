export interface Ihome {
  banners: any[]
  recommends: any[]
}
// 多个属性  最终要整合为一个属性
export interface IhomeState {
  home: Ihome
}

const initialHome: IhomeState = {
  home: {
    banners: [],
    recommends: []
  }
}

export enum IHomeAction {
  INIT,
  CHANGE
}

function homeReducer(
  state: IhomeState = initialHome,
  action: { type: IHomeAction; payload: any }
): IhomeState {
  switch (action.type) {
    case IHomeAction.INIT:
      return state
    case IHomeAction.CHANGE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default homeReducer
