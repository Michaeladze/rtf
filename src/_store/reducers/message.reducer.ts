import { handleActions } from 'redux-actions';

export interface IMessageState {
  show: boolean;
}

const initialState: IMessageState = {
  show: false
};

export const messageReducer = handleActions(
  {},
  initialState
);
