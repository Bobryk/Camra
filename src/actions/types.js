export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
export type Action =
    { type: 'IMAGE_LOAD', payload: Object }
  | { type: 'IMAGE_LOADED'}
  | { type: 'IMAGE_SAVE', payload: String }
  | { type: 'RESET' }
