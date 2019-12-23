import Axios from 'axios-observable';
import { map } from 'rxjs/operators';

/** Сервис получения руководителя текущего пользователя */
export const getBoss = () => {
  return Axios.post('colleagues/getBoss', {}).pipe(
    map((data) => {
      return data.data;
    })
  );
};
