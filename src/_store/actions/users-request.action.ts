import { createActions } from 'redux-actions';
import {
  AddUserRequestBody,
  IAssessment,
  IAssessmentBody,
  IAssessmentResponseBody,
  IIncomeAssessmentsUser,
  IRequest,
  IRequestMeta,
  IRequestsListPayload
} from '../reducers/users-request.reducer';
import { IPagination, IPaginationRequest } from '../store.interface';
import { IInterviewQuestion, IInterviewResponse, ISPAssessment, ISPResponse } from '../interfaces/sberprofi.interface';

export enum GetUsersWithRequest {
  Pending = '[Pending] Получение пользователей с запросами',
  Success = '[Success] Получение пользователей с запросами'
}

export enum GetIncomeAssessmentsFromPerson {
  Pending = '[Pending] Получение списка запросов от пользователя',
  Success = '[Success] Получение списка запросов от пользователя'
}

export enum GetItemIncomeAssessment {
  Pending = '[Pending] Получение запроса',
  Success = '[Success] Получение запроса'
}

/** Добавление запроса по сокетам */
export enum AddUserRequest {
  Success = '[Socket Success] Добавление запроса по сокетам'
}

export enum AnswerUserRequest {
  Pending = '[Pending] Отвечаем на запрос от пользователя',
  Success = '[Success] Отвечаем на запрос от пользователя'
}

export enum SetActiveRequest {
  Set = '[Set] Устанавливаем активный запрос для ответа'
}

/** Экшн оценки проекта */
export enum AddProjectAssessment {
  Pending = '[Pending] Поставить оценку проекту',
  Success = '[Success] Поставить оценку проекту'
}

/** Поиск по ФИО среди пользователей со входящими запросами */
export enum SetIncomeRequestsUsersFilter {
  Pending = '[Pending] Поиск По ФИО (входящие запросы)',
  Success = '[Success] Поиск По ФИО (входящие запросы)'
}

/** Экшн изменить число ОС активного пользователя */
export enum UpdateCountInRequestList {
  Success = '[Set] Изменить число ОС активного пользователя в списке'
}

/** Экшн сброса флага загрузки запросов */
export enum ClearAssessmentsLoadedFlag {
  Set = '[Set] Сброс флага загрузки запросов'
}

// ====================================================================================================================
/** Сберпрофи и интервью */

/** Получить вопросы для коллег */
export enum GetUserEstimate {
  Pending = '[Pending] Получить вопросы для коллег',
  Success = '[Success] Получить вопросы для коллег'
}

/** Сохранить ответ на запрос проф оценки */
export enum SaveEstimateFrom {
  Pending = '[Pending] Сохранить ответ на запрос проф оценки',
  Success = '[Success] Сохранить ответ на запрос проф оценки'
}

/** Ответить за запрос проф оценки */
export enum SendEstimateResponse {
  Pending = '[Pending] Ответить за запрос проф оценки',
  Success = '[Success] Ответить за запрос проф оценки'
}

/** Сохранить ответ на запрос проф оценки */
export enum SaveInterviewFrom {
  Pending = '[Pending] Сохранить ответ на запрос интервью',
  Success = '[Success] Сохранить ответ на запрос интервью'
}

/** Ответить за запрос интервью */
export enum SendInterviewResponse {
  Pending = '[Pending] Ответить за запрос интервью',
  Success = '[Success] Ответить за запрос интервью'
}

/** Не могу ответить за запрос профи */
export enum CanNotAnswerEstimate {
  Pending = '[Pending] Не могу ответить за запрос профи',
  Success = '[Success] Не могу ответить за запрос профи'
}

/** Не могу ответить за запрос интервью */
export enum CanNotAnswerInterview {
  Pending = '[Pending] Не могу ответить за запрос интервью',
  Success = '[Success] Не могу ответить за запрос интервью'
}

// ====================================================================================================================

/** Экшн для получения истории */
createActions({
  [GetIncomeAssessmentsFromPerson.Pending]: (payload: IRequestsListPayload) => payload,
  [GetIncomeAssessmentsFromPerson.Success]: (payload: { details: IPagination<IRequestMeta>; }) => payload,

  [GetUsersWithRequest.Pending]: (payload: IPaginationRequest) => payload,
  [GetUsersWithRequest.Success]: (payload: { users: IPagination<IIncomeAssessmentsUser> }) => payload,

  [UpdateCountInRequestList.Success]: (payload: { sUserId: string }) => payload,

  [SetIncomeRequestsUsersFilter.Pending]: (payload: IPaginationRequest) => payload,
  [SetIncomeRequestsUsersFilter.Success]: (payload: { users: IPagination<IIncomeAssessmentsUser> }) => payload,

  [GetItemIncomeAssessment.Pending]: (payload: IRequestMeta) => payload,
  [GetItemIncomeAssessment.Success]: (payload: { assessment: IRequest }) => payload,

  [AnswerUserRequest.Pending]: (payload: IAssessmentResponseBody) => payload,
  [AnswerUserRequest.Success]: (payload: { assessmentToRemove: string }) => payload,

  [AddUserRequest.Success]: (payload: { addAssessment: AddUserRequestBody }) => payload,

  [SetActiveRequest.Set]: (payload: { activeAssessmentMeta: IRequestMeta }) => payload,

  [AddProjectAssessment.Pending]: (payload: { body: IAssessmentBody, sUserId: string }) => payload,
  [AddProjectAssessment.Success]: (payload: { assessment: IAssessment }) => payload,

  [ClearAssessmentsLoadedFlag.Set]: (payload: { clearAssessments: boolean }) => payload,

  // ==================================================================================================================

  [GetUserEstimate.Pending]: (payload: string) => payload,
  [GetUserEstimate.Success]: (payload: { questions: IInterviewQuestion[] }) => payload,

  [SaveEstimateFrom.Pending]: (payload: { body: ISPResponse }) => payload,
  [SaveEstimateFrom.Success]: undefined,

  [SendEstimateResponse.Pending]: (payload: { body: ISPResponse, sId: string }) => payload,
  [SendEstimateResponse.Success]: undefined,

  [SaveInterviewFrom.Pending]: (payload: { body: IInterviewResponse }) => payload,
  [SaveInterviewFrom.Success]: undefined,

  [SendInterviewResponse.Pending]: (payload: { body: IInterviewResponse, sId: string }) => payload,
  [SendInterviewResponse.Success]: undefined,

  [CanNotAnswerEstimate.Pending]: (payload: { body: ISPAssessment, sId: string }) => payload,
  [CanNotAnswerEstimate.Success]: undefined,

  [CanNotAnswerInterview.Pending]: (payload: { body: ISPAssessment, sId: string }) => payload,
  [CanNotAnswerInterview.Success]: undefined
});
