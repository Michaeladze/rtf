import Axios from 'axios-observable';
import { map } from 'rxjs/operators';

/** Сервис получения избранных пользователей */
export const getFavouriteUsers = () => {
  return Axios.post('favourite/get', {}).pipe(map((data) => data.data));
};

/** Сервис добавления пользователя в избранное */
export const addUserToFavourite = (userId: string, bIsPinned?: boolean) => {
  return Axios.post('favourite/add', [{ bIsPinned, sUserId: userId }]).pipe(
    map((data) => data.data)
  );
};

/** Сервис удаления пользователя из избранного */
export const removeUserFromFavourite = (userId: string) => {
  return Axios.post('favourite/remove', [{ sUserId: userId }]).pipe(
    map((data) => data.data)
  );
};
