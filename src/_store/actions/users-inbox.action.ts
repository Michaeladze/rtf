import { createActions } from 'redux-actions';
import { IUser } from '../reducers/users-all.reducer';
import {
  IAllInboxBody,
  IAllInboxResponse,
  IAssessmentsCount,
  IIncomeAssessments
} from '../reducers/users-inbox.reducer';

/** Получение списка всех существующих пользователей */
export enum GetInboxUsers {
  Pending = '[Pending] Получение списка входящих',
  Success = '[Success] Получение списка входящих'
}

/** Получение всех входящих */
export enum GetInboxAll {
  Pending = '[Pending] Получение всех входящих',
  Success = '[Success] Получение всех входящих'
}

/** Получение количества всех запросов и оценок */
export enum GetAssessmentsCount {
  Pending = '[Pending] Получение количества всех запросов и оценок',
  Success = '[Success] Получение количества всех запросов и оценок'
}

/** Получение количества всех запросов и оценок по пользователю */
export enum GetAssessmentsByIdCount {
  Pending = '[Pending] Получение количества всех запросов и оценок по пользователю',
  Success = '[Success] Получение количества всех запросов и оценок по пользователю'
}

/** Добавить пользователя во входящие по сокетам */
export enum AddUserToInbox {
  Pending = '[Socket Pending] Добавить пользователя во входящие по сокетам',
  Success = '[Socket Success] Добавить пользователя во входящие по сокетам'
}

/** Добавить пользователя во входящие запросы по сокетам */
export enum AddUserToRequests {
  Pending = '[Socket Pending] Добавить пользователя во входящие запросы по сокетам',
  Success = '[Socket Success] Добавить пользователя во входящие запросы по сокетам'
}

createActions({
  [GetInboxUsers.Pending]: undefined,
  [GetInboxUsers.Success]: (payload: { users: IIncomeAssessments[] }) =>
    payload,

  [GetAssessmentsCount.Pending]: undefined,
  [GetAssessmentsCount.Success]: (payload: {
    assessmentsCount: IAssessmentsCount;
  }) => payload,

  [GetAssessmentsByIdCount.Pending]: undefined,
  [GetAssessmentsByIdCount.Success]: (payload: {
    assessmentsCount: IAssessmentsCount;
  }) => payload,

  [GetInboxAll.Pending]: (payload: IAllInboxBody) => payload,
  [GetInboxAll.Success]: (payload: { inboxAll: { list: IAllInboxResponse, type: string } }) => payload,

  [AddUserToInbox.Pending]: (payload: { user: string, type: string }) => payload,
  [AddUserToInbox.Success]: (payload: {
    addInboxUser: {
      user: IUser,
      type: string
    }
  }) => payload,

  [AddUserToRequests.Pending]: (payload: string) => payload,
  [AddUserToRequests.Success]: (payload: { addSocketUser: IUser }) => payload
});
