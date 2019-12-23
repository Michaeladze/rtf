import { createActions } from 'redux-actions';
import { IUser } from '../reducers/users-all.reducer';
import { IComparisonUser } from '../reducers/comparison.reducer';

/** Выбор пользователя для сравнения */
export enum SetUserForComparison {
  Pending = '[Pending] Выбор пользователя для сравнения',
  Success = '[Success] Выбор пользователя для сравнения'
}
/** Установка фильтра */
export enum SetComparisonFilter {
  Pending = '[Pending] Фильтр по активному пероду в сравнении',
  Success = '[Success] Фильтр по активному пероду в сравнении'
}

/** Очистка таблицы */
export enum ClearComparisonTable {
  Set = '[Set] Очистка таблицы'
}

/** Установка активного периода */
export enum SetComparisonPeriodFilter {
  Set = '[Set] Запись фильтра'
}

createActions({
  [SetUserForComparison.Pending]: (payload: { sDatePeriod: string, user: IUser }) => payload,
  [SetUserForComparison.Success]: (payload: { user: IComparisonUser, sUserFIO: string }) => payload,

  [SetComparisonFilter.Pending]: (payload: { sDatePeriod: string, users: { user: IUser }[] }) => payload,
  [SetComparisonFilter.Success]: (payload: { users: IComparisonUser[] }) => payload,

  [ClearComparisonTable.Set]: (payload: { clear: boolean }) => payload,

  [SetComparisonPeriodFilter.Set]: (payload: { sDatePeriod: string }) => payload
});
