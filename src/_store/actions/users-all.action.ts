import { createActions } from 'redux-actions';
import { IUser } from '../reducers/users-all.reducer';

/** Получение списка всех существующих пользователей */
export enum GetAllUsers {
  Pending = '[Pending] Получение списка пользователей',
  Success = '[Success] Получение списка пользователей'
}

createActions({
  [GetAllUsers.Pending]: (payload: { searchRequest: string }) => payload,
  [GetAllUsers.Success]: (payload: { users: IUser[] }) => payload
});
