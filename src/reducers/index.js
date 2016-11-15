import type { Action } from '../actions/types'
import { handleAction } from 'redux-actions'

const initialImageState = {
  loaded: false,
  source: {
    uri: '',
    isStatic: true
  },
  base64: '',
  width: 100,
  height: 100
}

const image = (state = initialImageState, action: Action) => {
  switch (action.type) {
  case 'IMAGE_LOAD':
    return Object.assign({}, state, { source: action.payload })
  case 'IMAGE_LOADED':
    return Object.assign({}, state, { loaded: true })
  case 'IMAGE_SAVE':
    return Object.assign({}, state, { base64: action.payload })
  case 'RESET':
    return Object.assign({}, initialImageState)
  default:
    return state
  }
}

export {
  image
}
