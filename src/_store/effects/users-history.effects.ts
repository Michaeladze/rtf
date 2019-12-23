import { ActionsObservable, ofType } from 'redux-observable';
import { Action } from 'redux-actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { showErrorMessage } from '../actions/_common.action';
import {
  GetHistory,
  GetUserHistory, SetHistoryUsersFilter,
  UpdateAssessmentStatus,
  UpdateProjectAssessmentStatus
} from '../actions/users-history.action';
import { IHistoryBody, IUpdateProjectStatusBody, IUpdateStatusBody } from '../reducers/users-history.reducer';
import {
  getHistory,
  getHistoryUsers,
  updateAssessmentStatus,
  updateProjectAssessmentStatus
} from '../services/users-history.service';
import { UpdateAssessmentsCount } from '../actions/users.action';
import { IPagination, IPaginationRequest } from '../store.interface';
import { IIncomeAssessmentsUser } from '../reducers/users-request.reducer';

/** Эффект получения пользователей для истории */
export const getUserHistoryEffect$ = (
  actions$: ActionsObservable<Action<IPaginationRequest>>
) =>
  actions$.pipe(
    ofType(GetUserHistory.Pending),
    switchMap((action) =>
      getHistoryUsers(action.payload).pipe(
        map((data: IPagination<IIncomeAssessmentsUser>) => ({
          type: GetUserHistory.Success,
          payload: { users: data }
        })),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Эффект получения пользователей через строку поиска */
export const setHistoryUsersFilterEffect$ = (
  actions$: ActionsObservable<Action<IPaginationRequest>>
) =>
  actions$.pipe(
    ofType(SetHistoryUsersFilter.Pending),
    switchMap((action) =>
      getHistoryUsers(action.payload).pipe(
        map((data: IPagination<IIncomeAssessmentsUser>) => ({
          type: SetHistoryUsersFilter.Success,
          payload: { users: data }
        })),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Получение истории */
export const getHistoryEffect$ = (actions$: ActionsObservable<Action<{ body: IHistoryBody; userChanged?: boolean }>>) =>
  actions$.pipe(
    ofType(GetHistory.Pending),
    switchMap((action) =>
      getHistory(action.payload.body).pipe(
        map((data: any) => ({
          type: GetHistory.Success,
          payload: { history: data }
        })),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Обновление статуса оценки */
export const updateAssessmentStatusEffect$ = (actions$: ActionsObservable<Action<IUpdateStatusBody>>) =>
  actions$.pipe(
    ofType(UpdateAssessmentStatus.Pending),
    switchMap((action) =>
      updateAssessmentStatus(action.payload).pipe(
        mergeMap(() => [
          {
            type: UpdateAssessmentStatus.Success,
            payload: {
              assessment: action.payload
            }
          },
          {
            type: UpdateAssessmentsCount.Success,
            payload: {
              sUserId: action.payload.sUserId
            }
          }
        ]),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Обновление статуса оценки проекта */
export const updateProjectAssessmentStatusEffect$ = (actions$: ActionsObservable<Action<IUpdateProjectStatusBody>>) =>
  actions$.pipe(
    ofType(UpdateProjectAssessmentStatus.Pending),
    switchMap((action) =>
      updateProjectAssessmentStatus(action.payload).pipe(
        mergeMap(() => [
          {
            type: UpdateAssessmentStatus.Success,
            payload: {
              assessment: action.payload
            }
          },
          {
            type: UpdateAssessmentsCount.Success,
            payload: {
              sUserId: action.payload.sUserId
            }
          }
        ]),
        catchError(() => showErrorMessage())
      )
    )
  );
