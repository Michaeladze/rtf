import { IUser } from '../../../_store/reducers/users-all.reducer';

/** Функция для фильтрации пользователей
 * @param users - список пользователей
 * @param filter - строка со значением фильтра */

export const filterMyTeam = (users: IUser[], filter: string) => {
  if (users) {
    try {
      return users.filter((property: IUser) => {
        let result = true;

        result = result && property.sFullName !== undefined &&
          (property.sFullName.toLowerCase().includes(filter.toLowerCase()));

        return result;
      });

    } catch (e) {
      return users;
    }
  }

  return [];
};
