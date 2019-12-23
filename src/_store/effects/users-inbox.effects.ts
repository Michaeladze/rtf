import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { ShowMessage } from '../actions/message.action';
import {
  AddUserToInbox,
  AddUserToRequests,
  GetAssessmentsByIdCount,
  GetAssessmentsCount,
  GetInboxAll
} from '../actions/users-inbox.action';
import { searchUser } from '../services/users-all.service';
import {
  getAssessmentsByIdCount,
  getAssessmentsCount,
  getIncomeAll
} from '../services/users-inbox.service';
import { showErrorMessage } from '../actions/_common.action';
import {
  IAllInboxBody,
  IAllInboxResponse,
  IAssessmentsCount
} from '../reducers/users-inbox.reducer';

/** Эффект получения всех входящих  */
export const getInboxAll$ = (actions$: ActionsObservable<Action<IAllInboxBody>>) =>
  actions$.pipe(
    ofType(GetInboxAll.Pending),
    switchMap((action) =>
      getIncomeAll(action.payload).pipe(
        map((data: IAllInboxResponse) => ({
          type: GetInboxAll.Success,
          payload: {
            inboxAll: {
              list: data,
              type: action.payload.sLoadOption
            }
          }
        })),
        catchError(() => showErrorMessage())
      )
    )
  );

// /** Эффект получения списка входящих запросов */
// export const getInboxUsers$ = (actions$: ActionsObservable<Action<string>>) =>
//   actions$.pipe(
//     ofType(GetInboxUsers.Pending),
//     switchMap(() =>
//       getIncomeAssessments().pipe(
//         map((data: IIncomeAssessments) => ({
//           type: GetInboxUsers.Success,
//           payload: { users: data }
//         })),
//         catchError(() => showErrorMessage())
//       )
//     )
//   );

/** Эффект получения количества всех запросов и оценок */
export const getAssessmentsCount$ = (
  actions$: ActionsObservable<Action<undefined>>
) =>
  actions$.pipe(
    ofType(GetAssessmentsCount.Pending),
    switchMap(() =>
      getAssessmentsCount().pipe(
        map((data: IAssessmentsCount) => ({
          type: GetAssessmentsCount.Success,
          payload: { assessmentsCount: data }
        })),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Эффект получения количества всех запросов и оценок по пользователю */
export const getAssessmentsByIdCount$ = (
  actions$: ActionsObservable<Action<string>>
) =>
  actions$.pipe(
    ofType(GetAssessmentsByIdCount.Pending),
    switchMap((action) =>
      getAssessmentsByIdCount(action.payload).pipe(
        map((data: IAssessmentsCount) => ({
          type: GetAssessmentsByIdCount.Success,
          payload: { assessmentsCount: data }
        })),
        catchError(() => showErrorMessage())
      )
    )
  );

/** [Socket] Добавить пользователя во входящие по сокетам */
export const addUserToInbox$ = (
  actions$: ActionsObservable<Action<{ user: string, type: string }>>
) =>
  actions$.pipe(
    ofType(AddUserToInbox.Pending),
    switchMap((action) =>
      searchUser(action.payload.user).pipe(
        mergeMap((data) => (
          [
            {
              type: AddUserToInbox.Success, payload: {
                addInboxUser: {
                  user: data[0],
                  type: action.payload.type
                }
              }
            },
            { type: ShowMessage.Success }
          ]
        )),
        catchError(() => showErrorMessage())
      )
    )
  );

/** [Socket] Добавить пользователя во входящие запросы по сокетам */
export const addUserToRequests$ = (
  actions$: ActionsObservable<Action<string>>
) =>
  actions$.pipe(
    ofType(AddUserToRequests.Pending),
    switchMap((action) =>
      searchUser(action.payload).pipe(
        mergeMap((data) => {
          if (data.length > 0) {
            return [
              { type: AddUserToRequests.Success, payload: { addSocketUser: data[0] } }, { type: ShowMessage.Success }
            ]
          } else {
            return [{ type: ShowMessage.Success }]
          }
        }),
        catchError(() => showErrorMessage())
      )
    )
  );
