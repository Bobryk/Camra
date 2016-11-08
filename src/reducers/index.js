import type { Action } from '../actions/types'
import { handleAction } from 'redux-actions'

const image = handleAction('IMAGE_SAVE',
  (state, action) => action.payload,
  null
)

export {
  image
}
