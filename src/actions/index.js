import { createAction } from 'redux-actions'

import type { Dispatch, GetState, ThunkAction } from '../actions/types'

export function updateImage(newImage: object): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(changeImagePath(newImage))
  }
}
const changeImagePath = createAction(
  'IMAGE_SAVE',
  image => image
)
