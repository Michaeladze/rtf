import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { IUser } from '../reducers/users-all.reducer';
import { DeleteFromRecent, GetRecentUsers, SetPinForRecent } from '../actions/users-recent.action';
import { getRecentUsers } from '../services/users-recent.service';
import { showErrorMessage } from '../actions/_common.action';

/** Эффект получения списка последних активных пользователей */
export const getRecentUsersEffect$ = (
  actions$: ActionsObservable<Action<IUser[]>>
) =>
  actions$.pipe(
    ofType(GetRecentUsers.Pending),
    switchMap(() =>
      getRecentUsers().pipe(
        map((data: IUser[]) => ({
          type: GetRecentUsers.Success,
          payload: { users: data }
        })),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Эффект запинивания пользователя */
export const setPinForRecentEffect$ = (
  actions$: ActionsObservable<Action<IUser>>
) =>
  actions$.pipe(
    ofType(SetPinForRecent.Pending),
    map((action) => ({
      type: SetPinForRecent.Success,
      payload: action.payload
    }))
  );

/** Эффект удаления пользователя из списка */
export const deleteFromRecentEffect$ = (
  actions$: ActionsObservable<Action<IUser>>
) =>
  actions$.pipe(
    ofType(DeleteFromRecent.Pending),
    map((action) => ({
      type: DeleteFromRecent.Success,
      payload: action.payload
    }))
  );
