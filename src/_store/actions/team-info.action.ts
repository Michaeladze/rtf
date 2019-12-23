import { createActions } from 'redux-actions';
import { ITeamInfo, ITeamInfoBody } from '../reducers/team-info.reducer';

/** Экшн получения информации по подчиненным */
export enum GetTeamInfo {
  Pending = '[Pending] Получение информации по подчиненным',
  Success = '[Success] Получение информации по подчиненным'
}

/** Экшн очистки списка подчиненных */
export enum ClearTeamList {
  Set = '[Set] Очистка списка подчиненных'
}

createActions({
  [GetTeamInfo.Pending]: (payload: ITeamInfoBody) => payload,
  [GetTeamInfo.Success]: (payload: { users: ITeamInfo }) => payload,
  [ClearTeamList.Set]: (payload: { clear: boolean }) => payload
});
