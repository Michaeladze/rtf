import Axios from 'axios-observable';
import { map } from 'rxjs/operators';
import { ITeamInfoBody } from '../reducers/team-info.reducer';

/** Сервис получения информации по подчиненным */
export const getTeamInfo = (body: ITeamInfoBody) => {
  return Axios.post('report/teamInfo', body).pipe(map((data) => data.data));
};
