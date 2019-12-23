import { createActions } from 'redux-actions';
import { IUser } from '../reducers/users-all.reducer';
import {
  IHistoryBody,
  IIncomeRatings, IProject, IUpdateProjectStatusBody, IUpdateStatusBody
} from '../reducers/users-history.reducer';
import { IPagination, IPaginationRequest } from '../store.interface';

export enum GetUserHistory {
  Pending = '[Pending] Получение пользователей из истории',
  Success = '[Success] Получение пользователей из истории'
}

export enum GetHistory {
  Pending = '[Pending] Получение истории пользователя',
  Success = '[Success] Получение истории пользователя'
}

export enum UpdateAssessmentStatus {
  Pending = '[Pending] Изменение статуса оценки',
  Success = '[Success] Изменение статуса оценки'
}

export enum UpdateProjectAssessmentStatus {
  Pending = '[Pending] Обновить статус оценки проекта',
  Success = '[Success] Обновить статус оценки проекта'
}

/** Поиск по ФИО */
export enum SetHistoryUsersFilter {
  Pending = '[Pending] Поиск По ФИО история запросов)',
  Success = '[Success] Поиск По ФИО история запросов)'
}

/** Экшн сброса флага загрузки истории */
export enum ClearHistoryFlag {
  Set = '[Set] Сброс флага загрузки истории'
}

/** Экшн для получения истории */
createActions({
  [GetUserHistory.Pending]: (payload: IPaginationRequest) => payload,
  [GetUserHistory.Success]: (payload: { users: IPagination<IUser> }) => payload,

  [SetHistoryUsersFilter.Pending]: (payload: IPaginationRequest) => payload,
  [SetHistoryUsersFilter.Success]: (payload: { users: IPagination<IUser> }) => payload,

  [GetHistory.Pending]: (payload: {body: IHistoryBody, userChanged?: boolean}) => payload,
  [GetHistory.Success]: (payload: { history: IIncomeRatings }) => payload,

  [UpdateAssessmentStatus.Pending]: (payload: IUpdateStatusBody) => payload,
  [UpdateAssessmentStatus.Success]: (payload: { assessment: IUpdateStatusBody }) => payload,

  [UpdateProjectAssessmentStatus.Pending]: (payload: IUpdateProjectStatusBody) => payload,
  [UpdateProjectAssessmentStatus.Success]: (payload: { assessment: IProject }) => payload,

  [ClearHistoryFlag.Set]: (payload: { clearHistory: boolean }) => payload
});
