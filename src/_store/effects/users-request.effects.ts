import { ActionsObservable, ofType } from 'redux-observable';
import { Action } from 'redux-actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { UpdateRecentFlag } from '../actions/users-recent.action';
import {
  AddProjectAssessment,
  AnswerUserRequest,
  CanNotAnswerEstimate,
  CanNotAnswerInterview,
  GetIncomeAssessmentsFromPerson,
  GetItemIncomeAssessment,
  GetUserEstimate,
  GetUsersWithRequest,
  SaveEstimateFrom,
  SaveInterviewFrom,
  SendEstimateResponse,
  SendInterviewResponse,
  SetIncomeRequestsUsersFilter
} from '../actions/users-request.action';
import {
  addProjectAssessment,
  answerTheRequestService,
  canNotAnswerEstimate,
  canNotAnswerInterview,
  getIncomeAssessmentsFromPerson,
  getItemIncomeAssessment,
  getUserEstimate,
  saveEstimateResponse,
  saveInterviewResponse,
  sendEstimateResponse,
  sendInterviewResponse
} from '../services/users-request.service';
import {
  IAssessmentBody,
  IAssessmentResponseBody,
  IIncomeAssessmentsUser,
  IRequest,
  IRequestMeta,
  IRequestsListPayload
} from '../reducers/users-request.reducer';
import { showErrorMessage } from '../actions/_common.action';
import { notification, sendNotification } from '../../react_shared/components/notifications/notification';
import { getIncomeAssessments } from '../services/users-inbox.service';
import { IPagination, IPaginationRequest } from '../store.interface';
import { UpdateAssessmentsCount } from '../actions/users.action';
import { IInterviewResponse, ISPAssessment, ISPResponse } from '../interfaces/sberprofi.interface';

/** Получение пользователей с запросами */
export const getUsersWithRequestEffect$ = (
  actions$: ActionsObservable<Action<IPaginationRequest>>
) =>
  actions$.pipe(
    ofType(GetUsersWithRequest.Pending),
    switchMap((action) =>
      getIncomeAssessments(action.payload).pipe(
        map((data: IPagination<IIncomeAssessmentsUser>) => ({
          type: GetUsersWithRequest.Success,
          payload: { users: data }
        })),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Получение пользователей с запросами по строке поиска */
export const setIncomeRequestsUsersFilterEffect$ = (
  actions$: ActionsObservable<Action<IPaginationRequest>>
) =>
  actions$.pipe(
    ofType(SetIncomeRequestsUsersFilter.Pending),
    switchMap((action) =>
      getIncomeAssessments(action.payload).pipe(
        map((data: IPagination<IIncomeAssessmentsUser>) => ({
          type: SetIncomeRequestsUsersFilter.Success,
          payload: { users: data }
        })),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Получаем список запросов от пользователя */
export const getUserRequestEffect$ = (
  actions$: ActionsObservable<Action<IRequestsListPayload>>
) =>
  actions$.pipe(
    ofType(GetIncomeAssessmentsFromPerson.Pending),
    switchMap((action) =>
      getIncomeAssessmentsFromPerson(action.payload).pipe(
        map((data: IPagination<IRequestMeta>) => ({
          type: GetIncomeAssessmentsFromPerson.Success,
          payload: { details: data }
        })),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Получаем запрос по id */
export const getRequestEffect$ = (
  actions$: ActionsObservable<Action<IRequestMeta>>
) =>
  actions$.pipe(
    ofType(GetItemIncomeAssessment.Pending),
    switchMap((action) =>
      getItemIncomeAssessment(action.payload).pipe(
        map((data: IRequest) => ({
          type: GetItemIncomeAssessment.Success,
          payload: { assessment: data }
        })),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Эффект ответа на запрос обратной связи */
export const answerUserRequestEffect$ = (
  actions$: ActionsObservable<Action<{ body: IAssessmentResponseBody, sUserId: string }>>
) =>
  actions$.pipe(
    ofType(AnswerUserRequest.Pending),
    switchMap((action) =>
      answerTheRequestService(action.payload.body).pipe(
        mergeMap(() => {
          sendNotification({
            sMessage: notification.provideFeedback,
            iStatus: 1
          });
          return [
            { type: UpdateRecentFlag.Success, payload: { userId: action.payload.sUserId } },
            {
              type: AnswerUserRequest.Success,
              payload: { assessmentToRemove: action.payload.body.sId }
            },
            {
              type: UpdateAssessmentsCount.Success,
              payload: {
                sUserId: action.payload
              }
            }
            // {
            //   type: UpdateCountInRequestList.Success,
            //   payload: {
            //     sUserId: action.payload.sUserId
            //   }
            // }
          ]
        }),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Эффект оценки проекта */
export const addProjectAssessmentEffect$ =
  (actions$: ActionsObservable<Action<{ body: IAssessmentBody, sUserId: string }>>) =>
    actions$.pipe(
      ofType(AddProjectAssessment.Pending),
      switchMap((action) => {
        return addProjectAssessment(action.payload.body).pipe(
          mergeMap(() => {
            sendNotification({
              sMessage: notification.addProjectAssessment,
              iStatus: 1
            });
            return [
              { type: UpdateRecentFlag.Success, payload: { userId: action.payload } },
              {
                type: AnswerUserRequest.Success,
                payload: { assessmentToRemove: action.payload.body.sId }
              },
              {
                type: UpdateAssessmentsCount.Success,
                payload: {
                  sUserId: action.payload
                }
              }
              // {
              //   type: UpdateCountInRequestList.Success,
              //   payload: {
              //     sUserId: action.payload.sUserId
              //   }
              // }
            ]
          }),
          catchError(() => showErrorMessage())
        );
      })
    );

// ==================================================================================================================

/** Получить вопросы для коллег */
export const getUserEstimate$ = (
  actions$: ActionsObservable<Action<string>>
) =>
  actions$.pipe(
    ofType(GetUserEstimate.Pending),
    switchMap((action) =>
      getUserEstimate(action.payload).pipe(
        map((data) => ({ type: GetUserEstimate.Success, payload: { questions: data.aQuestions } })),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Отправить ответ на запрос проф оценки */
export const sendEstimateFrom$ = (
  actions$: ActionsObservable<Action<{ body: ISPResponse, sId: string }>>
) =>
  actions$.pipe(
    ofType(SendEstimateResponse.Pending),
    switchMap((action) =>
      sendEstimateResponse(action.payload.body).pipe(
        mergeMap((data) => ([
          { type: SendEstimateResponse.Success },
          {
            type: AnswerUserRequest.Success,
            payload: { assessmentToRemove: action.payload.sId }
          }
        ])),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Сохранить ответ на запрос проф оценки */
export const saveEstimateFrom$ = (
  actions$: ActionsObservable<Action<ISPResponse>>
) =>
  actions$.pipe(
    ofType(SaveEstimateFrom.Pending),
    switchMap((action) =>
      saveEstimateResponse(action.payload).pipe(
        map(() => {
          sendNotification({
            sMessage: 'Ваш ответ сохранен',
            iStatus: 1
          });
          return { type: SaveEstimateFrom.Success };
        }),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Отправить ответ на запрос интервью */
export const sendInterviewResponse$ = (
  actions$: ActionsObservable<Action<{ body: IInterviewResponse, sId: string }>>
) =>
  actions$.pipe(
    ofType(SendInterviewResponse.Pending),
    switchMap((action) =>
      sendInterviewResponse(action.payload.body).pipe(
        mergeMap((data) => ([
          { type: SendInterviewResponse.Success },
          {
            type: AnswerUserRequest.Success,
            payload: { assessmentToRemove: action.payload.sId }
          }
        ])),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Сохранить ответ на запрос интервью */
export const saveInterviewResponse$ = (
  actions$: ActionsObservable<Action<IInterviewResponse>>
) =>
  actions$.pipe(
    ofType(SaveInterviewFrom.Pending),
    switchMap((action) =>
      saveInterviewResponse(action.payload).pipe(
        map(() => {
          sendNotification({
            sMessage: 'Ваш ответ сохранен',
            iStatus: 1
          });
          return { type: SaveInterviewFrom.Success };
        }),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Не могу ответить за запрос профи */
export const canNotAnswerEstimate$ = (
  actions$: ActionsObservable<Action<{ body: ISPAssessment, sId: string }>>
) =>
  actions$.pipe(
    ofType(CanNotAnswerEstimate.Pending),
    switchMap((action) =>
      canNotAnswerEstimate(action.payload.body).pipe(
        mergeMap((data) => ([
          { type: CanNotAnswerEstimate.Success },
          {
            type: AnswerUserRequest.Success,
            payload: { assessmentToRemove: action.payload.sId }
          }
        ])),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Не могу ответить за запрос интервью */
export const canNotAnswerInterview$ = (
  actions$: ActionsObservable<Action<{ body: ISPAssessment, sId: string }>>
) =>
  actions$.pipe(
    ofType(CanNotAnswerInterview.Pending),
    switchMap((action) =>
      canNotAnswerInterview(action.payload.body).pipe(
        mergeMap((data) => ([
          { type: CanNotAnswerInterview.Success },
          {
            type: AnswerUserRequest.Success,
            payload: { assessmentToRemove: action.payload.sId }
          }
        ])),
        catchError(() => showErrorMessage())
      )
    )
  );
