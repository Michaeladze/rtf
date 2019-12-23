import Axios from 'axios-observable';
import { map } from 'rxjs/operators';

/** Сервис получения недавних/последних пользователей */
export const getRecentUsers = () => {
  return Axios.post('relation/recent', {}).pipe(map((data) => data.data));
};
