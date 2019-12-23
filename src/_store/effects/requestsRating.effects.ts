import { map, switchMap } from 'rxjs/operators';
import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { EditRequestsRating } from '../actions/requestRating.action';
import { IIndicator } from '../reducers/users-history.reducer';

/** Эффект получения команды текущего пользователя */
export const getRequestsRatingEffect$ = (
  actions$: ActionsObservable<Action<IIndicator[]>>
) =>
  actions$.pipe(
    ofType(EditRequestsRating.Pending),
    switchMap(() =>
      of([]).pipe(
        map((data: IIndicator[]) => {
          return {
            type: EditRequestsRating.Success,
            payload: data
          };
        })
      )
    )
  );
