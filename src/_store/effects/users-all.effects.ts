import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { showErrorMessage } from '../actions/_common.action';
import { searchUser } from '../services/users-all.service';
import { GetAllUsers } from '../actions/users-all.action';

/** Эффект получения списка всех пользователей */
export const getAllUsersEffect$ = (
  actions$: ActionsObservable<Action<string>>
) =>
  actions$.pipe(
    ofType(GetAllUsers.Pending),
    switchMap(({ payload }) =>
      searchUser(payload as string).pipe(
        map((data) => ({ type: GetAllUsers.Success, payload: { users: data } })),
        catchError(() => showErrorMessage())
      )
    )
  );
