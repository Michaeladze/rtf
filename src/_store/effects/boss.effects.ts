import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { showErrorMessage } from '../actions/_common.action';
import { GetBoss } from '../actions/boss.action';
import { getBoss } from '../services/boss.service';
import { IUser } from '../reducers/users-all.reducer';

/** Эффект получения руководителя текущего пользователя */
export const getBossEffect$ = (actions$: ActionsObservable<Action<IUser>>) =>
  actions$.pipe(
    ofType(GetBoss.Pending),
    switchMap(() =>
      getBoss().pipe(
        map((data) => ({ type: GetBoss.Success, payload: { boss: data } })),
        catchError(() => showErrorMessage())
      )
    )
  );
