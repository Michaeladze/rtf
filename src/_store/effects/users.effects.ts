import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { GetMe, GetUserById, SetActiveUser, SetCurrentUser } from '../actions/users.action';
import { IUser } from '../reducers/users-all.reducer';
import { getLoggedUser, searchUser } from '../services/users-all.service';
import { getAssessmentsByIdCount } from '../services/users-inbox.service';
import { IAssessmentsCount } from '../reducers/users-inbox.reducer';
import { showErrorMessage } from '../actions/_common.action';

/** Эффект получения моего ID */
export const getMeEffects$ = (actions$: ActionsObservable<Action<undefined>>) =>
  actions$.pipe(
    ofType(GetMe.Pending),
    switchMap(() =>
      getLoggedUser().pipe(
        map((data: IUser) => ({
          type: GetMe.Success,
          payload: { meUser: data }
        })),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Эффект получения юзера по ID */
export const getUserByIdEffects$ = (
  actions$: ActionsObservable<Action<{ sUserId: string }>>
) =>
  actions$.pipe(
    ofType(GetUserById.Pending),
    switchMap((action) =>
      searchUser(action.payload.sUserId).pipe(
        map((data: IUser[]) => {
          let users = data.filter((user: IUser) => user.sUserId === action.payload.sUserId);
          return {
            type: SetActiveUser.Success,
            payload: { currentUser: users.length > 0 ? users[0] : null }
          };
        }),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Эффект получения количества оценок и запросов по ID юзера*/
export const setCurrentUserWithAssessments$ = (
  actions$: ActionsObservable<Action<{ currentUser: IUser }>>
) =>
  actions$.pipe(
    ofType(SetCurrentUser.Pending),
    switchMap((action) =>
      getAssessmentsByIdCount(action.payload.currentUser.sUserId).pipe(
        map((data: IAssessmentsCount[]) => {
          const user = {
            ...action.payload.currentUser,
            iIncomeRequests: data && data[0] ? data[0].lInboxCount : 0,
            iIncomeRates: data && data[0] ? data[0].lOutboxCount : 0
          };

          return {
            type: SetCurrentUser.Success,
            payload: { currentUser: user }
          };
        }),
        catchError(() => showErrorMessage())
      )
    )
  );
