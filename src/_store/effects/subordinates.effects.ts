import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { IUser } from '../reducers/users-all.reducer';
import { showErrorMessage } from '../actions/_common.action';
import { GetSubordinates } from '../actions/subordinates.action';
import { IPagination, IPaginationRequest } from '../store.interface';
import { getSubordinates } from '../services/subordinates.service';

/** Эффект получения списка подчиненных */
export const getSubordinatesEffect$ = (
  actions$: ActionsObservable<Action<IPaginationRequest>>
) =>
  actions$.pipe(
    ofType(GetSubordinates.Pending),
    switchMap((action) =>
      getSubordinates(action.payload).pipe(
        map((users: IPagination<IUser>) => ({
          type: GetSubordinates.Success,
          payload: { users, sUserFIO: action.payload.sUserFIO }
        })),
        catchError(() => showErrorMessage())
      )
    )
  );
