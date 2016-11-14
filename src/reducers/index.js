import type { Action } from '../actions/types'
import { handleAction } from 'redux-actions'

const initialImageState = {
  loaded: false,
  source: {
    uri: '',
    isStatic: true
  }
}

const image = function(state = initialImageState, action: Action) {
  switch (action.type) {
  case 'IMAGE_LOAD':
    return Object.assign({}, state, { source: action.payload })
  case 'IMAGE_LOADED':
    return Object.assign({}, state, { loaded: true })
  default:
    return state
  }
}

export {
  image
}
