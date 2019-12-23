import Axios from 'axios-observable';
import { map } from 'rxjs/operators';
import { ISearch, ISearchResult, IUser } from '../reducers/users-all.reducer';

/** Получение вошедшего в систему пользователя */
export const getLoggedUser = () => {
  return Axios.post('report/whoAmI').pipe(map((data) => data.data));
};

/** Сервис получения всех существующих пользователей */
export const searchUser = (searchStr: string) => {
  return Axios.post(
    '/search',
    {
      sSearchLine: searchStr,
      iResultLimit: 10,
      iResultOffset: 0
    },
    { headers: { search: 'true' } }
  ).pipe(map(({ data }) => mapSearchUsers(data)));
};

export const mapSearchUsers = (searchUsers: ISearchResult): IUser[] => {
  if (searchUsers && searchUsers.oSearchResult) {
    return searchUsers.oSearchResult.map((u: ISearch) => ({
      sEmailSigma: u.oUserData.sEmailSigma,
      sFirstName: u.oUserData.sPersonFirstName,
      sFullName: `${u.oUserData.sPersonLastName} ${u.oUserData.sPersonFirstName} ${u.oUserData.sPersonMiddleName}`,
      sMiddleName: u.oUserData.sPersonMiddleName,
      sPhoto: '',
      sTitle: u.oUserData.sPositionName,
      sLastName: u.oUserData.sPersonLastName,
      sStructure: u.oUserData.sFunctionalBlock,
      sUserId: u.oUserData.sPersonSFID
    }));
  }

  return [];
};
