import { createActions } from 'redux-actions';

export enum ShowMessage {
  Success = 'ShowMessage'
}

createActions({
  [ShowMessage.Success]: undefined
});
