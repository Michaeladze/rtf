import { ActionsObservable, ofType } from 'redux-observable';
import { Action } from 'redux-actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { sendNotification } from '../../notifications/notification';
import { GetFeedback, IFeedBackPost } from './feedback.action';
import { sendFeedback$ } from './feedback.service';
import { showErrorMessage } from '../../../../_store/actions/_common.action';

export const feedbackPostEffect$ = (actions$: ActionsObservable<Action<IFeedBackPost>>) =>
  actions$.pipe(
    ofType(GetFeedback.Post),
    switchMap((action) =>
      sendFeedback$(action.payload).pipe(
        map(() => {
          sendNotification({
            sMessage: 'Спасибо за отзыв! Мы постоянно работаем над улучшением продукта.',
            iStatus: 1
          });
          return { type: GetFeedback.PostSuccess };
        }),
        catchError(() => showErrorMessage())
      )
    )
  );
