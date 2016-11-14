import { createAction } from 'redux-actions'

import type { Dispatch, GetState, ThunkAction } from '../actions/types'

export function updateImage(newImage: object): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(changeImagePath(newImage))
    dispatch(imageLoaded(true))
  }
}

const imageLoaded = createAction(
  'IMAGE_LOADED'
)
const changeImagePath = createAction(
  'IMAGE_LOAD',
  image => image
)
