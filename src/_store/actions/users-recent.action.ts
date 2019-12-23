import { createActions } from 'redux-actions';
import { IUser } from '../reducers/users-all.reducer';

/** Экшн получения списка последних активных пользователей */
export enum GetRecentUsers {
  Pending = '[Pending] получение списка последних активных пользователей',
  Success = '[Success] получение списка последних активных пользователей'
}

/** Экшн запиниивания пользователя в списке Последние */
export enum SetPinForRecent {
  Pending = '[Pending] Запинивание пользователя (Последние)',
  Success = '[Success] Запинивание пользователя (Последние)'
}

/** Экшн удаления пользователя из списка Последние */
export enum DeleteFromRecent {
  Pending = '[Pending] Удаление пользователя из списка Последние',
  Success = '[Success] Удаление пользователя из списка Последние'
}

/** Экшн для обновления недавних пользователей */
export enum UpdateRecentFlag {
  Success = '[Success] Удаление пользователя из списка Последние'
}

createActions({
  [GetRecentUsers.Pending]: undefined,
  [GetRecentUsers.Success]: (payload: { users: IUser[] }) => payload,

  [SetPinForRecent.Pending]: (payload) => ({ payload }),
  [SetPinForRecent.Success]: (payload: { currentUser: IUser }) => payload,

  [DeleteFromRecent.Pending]: (payload) => ({ payload }),
  [DeleteFromRecent.Success]: (payload: { currentUser: IUser }) => payload,

  [UpdateRecentFlag.Success]: (payload: { userId: string }) => payload
});
