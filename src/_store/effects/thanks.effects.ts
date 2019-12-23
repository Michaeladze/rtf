/** Эффект получения лайков */
import { ActionsObservable, ofType } from 'redux-observable';
import { Action } from 'redux-actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { addThankForAssessment, addThankForProject, getThanksCount } from '../services/thanks.service';
import { AddThank, AddThanksForProjectAssessment, GetThanksCount } from '../actions/thanks.action';
import { IAddThankBody, IAddThankForProjectBody, IThanksOverview } from '../reducers/users-inbox.reducer';
import { showErrorMessage, Success } from '../actions/_common.action';

/** Эффект получения количества благодарностей */
export const getThanksCount$ = (
  actions$: ActionsObservable<Action<undefined>>
) =>
  actions$.pipe(
    ofType(GetThanksCount.Pending),
    switchMap(() =>
      getThanksCount().pipe(
        map((data: IThanksOverview) => ({
          type: GetThanksCount.Success,
          payload: { likes: data }
        })),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Эффект добавления благодарности за ОС */
export const addThanksForAssessmentEffect$ = (
  actions$: ActionsObservable<Action<IAddThankBody>>
) =>
  actions$.pipe(
    ofType(AddThank.Pending),
    switchMap((action) =>
      addThankForAssessment(action.payload.sPersonAssessmentId, action.payload.sText).pipe(
        map(() => ({ type: Success.Success })),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Эффект добавления благодарности за проект */
export const addThanksForProjectEffect$ = (
  actions$: ActionsObservable<Action<IAddThankForProjectBody>>
) =>
  actions$.pipe(
    ofType(AddThanksForProjectAssessment.Pending),
    switchMap((action) =>
      addThankForProject(action.payload.sProjectAssessmentId, action.payload.sText).pipe(
        map(() => ({ type: Success.Success })),
        catchError(() => showErrorMessage())
      )
    )
  );
