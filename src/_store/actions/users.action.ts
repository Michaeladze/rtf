import { createActions } from 'redux-actions';
import { IUser } from '../reducers/users-all.reducer';

/** Получаем вошедшего юзера */
export enum GetMe {
  Pending = '[Pending] Получение моего ID',
  Success = '[Success] Получение моего ID'
}

/** Получаем юзера по sUserId */
export enum GetUserById {
  Pending = '[Pending] Получаем юзера по sUserId'
}

/** Экшн получения текщуего пользователя */
export enum SetCurrentUser {
  /** [Pending] для случаем, когда нужно запросить еще количество оценок и запросов */
  Pending = '[Pending] Получение текущего пользователя',
  Success = '[Set] Получение текущего пользователя'
}

/** Экшн получения активного пользователя */
export enum SetActiveUser {
  Success = '[Set] Получение активного пользователя'
}

/** Экшн изменить число ОС активного пользователя */
export enum UpdateAssessmentsCount {
  Success = '[Set] Изменить число ОС активного пользователя'
}

/** Экшн фильтрации активного списка */
export enum FilterActiveList {
  Success = '[Filter] Фильтруем активный список'
}

createActions({
  [GetMe.Pending]: undefined,
  [GetMe.Success]: (payload: { meUser: IUser }) => payload,

  [GetUserById.Pending]: (payload: { sUserId: string }) => payload,

  [SetCurrentUser.Pending]: (payload: { currentUser: IUser }) => payload,
  [SetCurrentUser.Success]: (payload: { currentUser: IUser }) => payload,

  [SetActiveUser.Success]: (payload: { currentUser: IUser, previousUser?: IUser | null }) => payload,
  [UpdateAssessmentsCount.Success]: (payload: { sUserId: string }) => payload,

  [FilterActiveList.Success]: (payload: { searchInput: string }) => payload
});
