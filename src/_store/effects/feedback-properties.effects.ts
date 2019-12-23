import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import {
  GetAllCompetences,
  GetAllSkills,
  GetRecommendedAttributes,
  GetRecommendedSkills,
  ProvideFeedback,
  RequestFeedback
} from '../actions/feedback-properties.action';
import { UpdateRecentFlag } from '../actions/users-recent.action';
import { IIndicator } from '../reducers/users-history.reducer';
import {
  getAllCompetences,
  getAllSkills,
  getRecommendedCompetences,
  getRecommendedSkills,
  provideFeedbackService,
  requestFeedbackService
} from '../services/feedback-properties.service';
import { showErrorMessage } from '../actions/_common.action';
import { IProvideFeedbackBody, IRequestFeedbackBody } from '../reducers/feedback-properties.reducer';
import { notification, sendNotification } from '../../react_shared/components/notifications/notification';

/** Эффект получения списка всех компетенций */
export const getAllCompetencesEffect$ = (actions$: ActionsObservable<Action<undefined>>) =>
  actions$.pipe(
    ofType(GetAllCompetences.Pending),
    switchMap(() => getAllCompetences()
      .pipe(
        map((data) => {
          return ({ type: GetAllCompetences.Success, payload: { competences: data } })
        }),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Эффект получения рекомендуемых атрибутов */ export const getRecommendedAttributesEffect$ = (
  actions$: ActionsObservable<Action<string>>
) =>
  actions$.pipe(
    ofType(GetRecommendedAttributes.Pending),
    switchMap(({ payload }) =>
      getRecommendedCompetences(payload).pipe(
        map((data: IIndicator[]) => ({
          type: GetRecommendedAttributes.Success,
          payload: { properties: data }
        })),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Эффект получения списка всех навыков */
export const getAllSkillsEffect$ = (
  actions$: ActionsObservable<Action<IIndicator[]>>
) =>
  actions$.pipe(
    ofType(GetAllSkills.Pending),
    switchMap(() =>
      getAllSkills().pipe(
        map((data) => ({
          type: GetAllSkills.Success,
          payload: { properties: data }
        })),
        catchError(() => showErrorMessage())
      )
    )
  ); // TODO

/** Эффект получения рекомендуемых навыков */ export const getRecommendedSkillsEffect$ = (
  actions$: ActionsObservable<Action<string>>
) =>
  actions$.pipe(
    ofType(GetRecommendedSkills.Pending),
    switchMap(({ payload }) =>
      getRecommendedSkills(payload).pipe(
        map((data: IIndicator[]) => ({
          type: GetRecommendedSkills.Success,
          payload: { properties: data }
        })),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Эффект создания запроса на обратную связь */
export const requestFeedbackEffect$ = (
  actions$: ActionsObservable<Action<IRequestFeedbackBody>>
) =>
  actions$.pipe(
    ofType(RequestFeedback.Pending),
    switchMap((action) =>
      requestFeedbackService(action.payload).pipe(
        mergeMap(() => {
          sendNotification({
            sMessage: notification.requestFeedback,
            iStatus: 1
          });

          return [
            {
              type: UpdateRecentFlag.Success,
              payload: { userId: action.payload.aRespondentsId[0] }
            },
            { type: RequestFeedback.Success }
          ];
        }),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Эффект обратной связи */
export const provideFeedbackEffect$ = (
  actions$: ActionsObservable<Action<IProvideFeedbackBody>>
) =>
  actions$.pipe(
    ofType(ProvideFeedback.Pending),
    switchMap((action) =>
      provideFeedbackService(action.payload).pipe(
        mergeMap(() => {
          sendNotification({
            sMessage: notification.provideFeedback,
            iStatus: 1
          });

          return [
            {
              type: UpdateRecentFlag.Success,
              payload: { userId: action.payload.aRequestersId[0] }
            },
            { type: ProvideFeedback.Success }
          ];
        }),
        catchError(() => showErrorMessage())
      )
    )
  );
