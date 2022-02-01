export interface ICountState {
  counter: number
}

const initialCount: ICountState = {
  counter: 0
}

export enum ICounterAction {
  INIT,
  CHANGECOUNTER
}

function counterReducer(
  state: ICountState = initialCount,
  action: { type: ICounterAction; payload: any }
): ICountState {
  switch (action.type) {
    case ICounterAction.INIT:
      return state
    case ICounterAction.CHANGECOUNTER:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default counterReducer
