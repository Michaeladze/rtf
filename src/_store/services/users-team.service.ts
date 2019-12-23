import Axios from 'axios-observable';
import { map } from 'rxjs/operators';

/** Сервис получения команды текщего пользователя */
export const getMyTeam = () => {
  return Axios.post('colleagues/get', {}).pipe(map((data) => data.data));
};
