import Axios from 'axios-observable';
import { map } from 'rxjs/operators';
import { IPaginationRequest } from '../store.interface';

/** Сервис получения команды текщего пользователя */
export const getSubordinates = (body: IPaginationRequest) => {
  return Axios.post('colleagues/subordinates', body).pipe(map((data) => data.data));
};
