import { ActionsObservable, ofType } from 'redux-observable';
import { Action } from 'redux-actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { getStatisticsForCompetencies } from '../services/statistics.service';
import { showErrorMessage } from '../actions/_common.action';
import { IUser } from '../reducers/users-all.reducer';
import { SetComparisonFilter, SetUserForComparison } from '../actions/comparison.action';
import { zip } from 'rxjs';
import { getTeamInfo } from '../services/team-info.service';
import { IComparisonUser } from '../reducers/comparison.reducer';
import { IAttributes } from '../reducers/statisticsAll.reducer';

/** Эффект получения данных пользователя для сравения */
export const getStatisticForUserEffect$ = (
  actions$: ActionsObservable<Action<{ sDatePeriod: string, user: IUser }>>
) =>
  actions$.pipe(
    ofType(SetUserForComparison.Pending),
    switchMap((action) => (
      zip(
        getTeamInfo({ sDatePeriod: action.payload.sDatePeriod, sUserId: action.payload.user.sUserId }),
        getStatisticsForCompetencies({ sDatePeriod: action.payload.sDatePeriod, sUserId: action.payload.user.sUserId }))
        .pipe(
          map((data) => {

            return {
              type: SetUserForComparison.Success,
              payload: {
                comparisonUser: {
                  user: action.payload.user,
                  info: data[0].aObjects[0],
                  competences: sortCompetences(data[1].aCompetence)
                }
              }
            }
          }),
          catchError(() => showErrorMessage()))
    ))
  );

/** Эффект фильтрации по активному периоду в таблице */
export const setComparisonFilterEffect$ =
  (actions$: ActionsObservable<Action<{ sDatePeriod: string, users: IComparisonUser[] }>>) =>
    actions$.pipe(ofType(SetComparisonFilter.Pending),
      switchMap((action) => {
        const stream$ = action.payload.users.map((ac) =>
          zip(
            getTeamInfo({ sDatePeriod: action.payload.sDatePeriod, sUserId: ac.user.sUserId }),
            getStatisticsForCompetencies({ sDatePeriod: action.payload.sDatePeriod, sUserId: ac.user.sUserId })
          )
        );

        return zip(...stream$)
          .pipe(
            map((data) => {
              const body = data.map((d) => {
                return {
                  user: d[0].aObjects[0].oUser,
                  info: d[0].aObjects[0],
                  competences: sortCompetences(d[1].aCompetence)
                }
              });

              return {
                type: SetComparisonFilter.Success,
                payload: { users: body, sDatePeriod: action.payload.sDatePeriod }
              }
            }),
            catchError(() => showErrorMessage()))
      }
      )
    );

/** Сортировка компетенций и атрибутов внутри каждой компетенции */
const sortCompetences = (competences: IAttributes[]) => {
  competences.forEach((competence) => {
    if (competence.aAttributes) {
      competence.aAttributes.sort((a: any, b: any) => (a.sId > b.sId ? 1 : -1));
    }
  });

  return competences.sort((a: any, b: any) => (a.sId > b.sId ? 1 : -1))
};
