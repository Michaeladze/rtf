import { ActionsObservable, ofType } from 'redux-observable';
import { Action } from 'redux-actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  GetStatisticsAttributes,
  GetStatisticsCompetencies,
  GetStatisticsSkills,
  GetStatisticsSummary
} from '../actions/statistics.action';
import {
  getItemsForAttributeStatistic,
  getItemsForSkillStatistic,
  getSkillStatistics,
  getStatisticsForCompetencies,
  getStatisticsSummary
} from '../services/statistics.service';
import { showErrorMessage } from '../actions/_common.action';
import { IAttributesStatisticsBody, IStatisticsBody, IStatisticsSkills } from '../reducers/statisticsAll.reducer';

// todo заменить мок-данные, когда будет сервис

/** Эффект получения истрии пользователя */
export const getStatisticsForCompetencies$ = (
  actions$: ActionsObservable<Action<{ body: IStatisticsBody }>>
) =>
  actions$.pipe(
    ofType(GetStatisticsCompetencies.Pending),
    switchMap((action) =>
      getStatisticsForCompetencies(action.payload.body).pipe(
        map((data) => ({
          type: GetStatisticsCompetencies.Success,
          payload: { data, flag: action.payload.body.sDatePeriod }
        })),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Эффект получения истрии пользователя */
export const getSkillStatisticsEffect$ = (
  actions$: ActionsObservable<Action<{ body: IStatisticsBody }>>
) =>
  actions$.pipe(
    ofType(GetStatisticsSkills.Pending),
    switchMap((action) =>
      getSkillStatistics(action.payload.body).pipe(
        map((data: IStatisticsSkills) => ({
          type: GetStatisticsSkills.Success,
          payload: { data: data.aSkillStatistics, flag: action.payload.body.sDatePeriod }
        })),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Эффект получения истрии пользователя */
export const getStatisticsSummary$ = (
  actions$: ActionsObservable<Action<undefined>>
) =>
  actions$.pipe(
    ofType(GetStatisticsSummary.Pending),
    switchMap(() =>
      getStatisticsSummary().pipe(
        map((data) => {
          return {
            type: GetStatisticsSummary.Success,
            payload: { summary: data }
          };
        }),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Эффект получения истрии пользователя */
export const getItemsForAttributeStatistic$ = (
  actions$: ActionsObservable<Action<IAttributesStatisticsBody>>
) =>
  actions$.pipe(
    ofType(GetStatisticsAttributes.Pending),
    switchMap((action) => {

      const stream$ = action.payload.sSkillId ?
        getItemsForSkillStatistic(action.payload) :
        getItemsForAttributeStatistic(action.payload);

      return stream$.pipe(
        map((data) => {
          const id = action.payload.sAttributeId ? action.payload.sAttributeId : action.payload.sSkillId;
          return {
            type: GetStatisticsAttributes.Success,
            payload: { attributes: data, id }
          };
        }),
        catchError(() => showErrorMessage())
      )
    }
    )
  );
