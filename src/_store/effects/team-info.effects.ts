import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { showErrorMessage } from '../actions/_common.action';
import { getTeamInfo } from '../services/team-info.service';
import { ITeamInfo, ITeamInfoBody } from '../reducers/team-info.reducer';
import { GetTeamInfo } from '../actions/team-info.action';

/** Эффект получения списка подчиненных */
export const getTeamInfoEffect$ = (
  actions$: ActionsObservable<Action<ITeamInfoBody>>
) =>
  actions$.pipe(
    ofType(GetTeamInfo.Pending),
    switchMap((action) =>
      getTeamInfo(action.payload).pipe(
        map((data: ITeamInfo) => ({
          type: GetTeamInfo.Success,
          payload: { users: { ...data, activePeriod: action.payload.sDatePeriod, sUserFIO: action.payload.sUserFIO } }
        })),
        catchError(() => showErrorMessage())
      )
    )
  );
