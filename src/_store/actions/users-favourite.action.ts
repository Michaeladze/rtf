import { createActions } from 'redux-actions';
import { IUser } from '../reducers/users-all.reducer';

/** --------------------------------------------------------------------------------------------------
 * Экшены для списка избранных пользователей в Обратной связи
 -------------------------------------------------------------------------------------------------- */

/** Экшн получения списка избранных пользователей */
export enum GetFavFeedbackUsers {
  Pending = '[Pending] Получение списка избранных пользователей',
  Success = '[Success] Получение списка избранных пользователей'
}

/** Экшн запиниивания пользователя в Избранном */
export enum SetPinForFav {
  Pending = '[Pending] Запинивание пользователя (Избранное)',
  Success = '[Success] Запинивание пользователя (Избранное)'
}

/** Экшн удаления пользователя из Избранного */
export enum DeleteFromFav {
  Pending = '[Pending] Удаление пользователя из избранного',
  Success = '[Success] Удаление пользователя из избранного'
}

/** Экшн добавления пользователя в избранное Обратной связи */
export enum AddToFeedbackFav {
  Pending = '[Pending] Добавление пользователя в избранное',
  Success = '[Success] Добавление пользователя в избранное'
}

createActions({
  [GetFavFeedbackUsers.Pending]: undefined,
  [GetFavFeedbackUsers.Success]: (payload: { users: IUser[] }) => payload,

  [SetPinForFav.Pending]: (payload: IUser) => payload,
  [SetPinForFav.Success]: (payload: { currentUser: IUser }) => payload,

  [DeleteFromFav.Pending]: (payload: IUser) => payload,
  [DeleteFromFav.Success]: (payload: { currentUser: IUser }) => payload,

  [AddToFeedbackFav.Pending]: (payload: IUser) => payload,
  [AddToFeedbackFav.Success]: (payload: { currentUser: IUser }) => payload
});
