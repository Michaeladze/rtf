import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { IUser } from '../reducers/users-all.reducer';
import { GetMyTeam } from '../actions/users-team.action';
import { getMyTeam } from '../services/users-team.service';
import { showErrorMessage } from '../actions/_common.action';

/** Эффект получения команды текущего пользователя */
export const getMyTeamEffect$ = (
  actions$: ActionsObservable<Action<IUser[]>>
) =>
  actions$.pipe(
    ofType(GetMyTeam.Pending),
    switchMap(() =>
      getMyTeam().pipe(
        map((data) => ({ type: GetMyTeam.Success, payload: { users: data } })),
        catchError(() => showErrorMessage())
      )
    )
  );
