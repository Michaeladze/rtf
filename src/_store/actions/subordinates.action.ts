import { createActions } from 'redux-actions';
import { IPagination, IPaginationRequest } from '../store.interface';
import { IUser } from '../reducers/users-all.reducer';

/** Экшн получения списка списка подчиненных */
export enum GetSubordinates {
  Pending = '[Pending] Получение списка подчиненных',
  Success = '[Success] Получение списка подчиненных'
}

/** Экшн очистки списка подчиненных */
export enum ClearSubordinatesList {
  Set = '[Set] Очистка списка сотрудников (подчиненных)'
}

createActions({
  [GetSubordinates.Pending]: (payload: IPaginationRequest) => payload,
  [GetSubordinates.Success]: (payload: { users: IPagination<IUser>}) => payload,

  [ClearSubordinatesList.Set]: (payload: { clear: boolean }) => payload
});
