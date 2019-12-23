import React, { useCallback, useEffect, useState } from 'react';
import AsideUsers from '../_shared/AsideUsers/AsideUsers';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../../_store/reducers/users-all.reducer';
import { IStore } from '../../_store/store.interface';
import { customEqual } from '../../_helpers/helpers';
import { AddUserToRequests } from '../../_store/actions/users-inbox.action';
import {
  AddUserRequest,
  GetUsersWithRequest,
  SetIncomeRequestsUsersFilter
} from '../../_store/actions/users-request.action';
import { useSocketSubscribe } from '../../_helpers/socket';
import { selectRequestList } from '../../_store/selectors/users.selectors';

export const IncomeRequestsAside: React.FC = () => {
  const dispatch = useDispatch();

  const [iSize] = useState(15);

  /** Флаг загрузки юзеров */
  const usersLoaded: boolean = useSelector(
    (store: IStore) => store.userRequest.usersLoaded,
    customEqual
  );

  useEffect(() => {
    if (!usersLoaded) {
      dispatch({ type: GetUsersWithRequest.Pending, payload: { iPage: 0, iSize } });
    }
    /** Чистим фильтр, для сброса предыдущих результатов поиска */
    return () => {
      if (usersLoaded) {
        dispatch({ type: SetIncomeRequestsUsersFilter.Pending, payload: { iPage: 0, iSize, sUserFIO: null } });
      }
    }
  }, [dispatch, iSize, usersLoaded]);

  /** ----------------------------------------------------------------------------------------------------------------------
   * Получение данных из стора
   ---------------------------------------------------------------------------------------------------------------------- */
  /** Фильтрованные пользователи */
  const inboxUsers: IUser[] = useSelector(selectRequestList);

  /** Подписываемся на вошедшего юзера */
  const loggedUser: IUser | null = useSelector((store: IStore) => store.users.me, customEqual);

  /** Функция обработки данных из сокетов */
  const socketCallback = useCallback((data: any) => {
    if (data.sAction === 'addRequest') {
      const index = inboxUsers.map((u) => u.sUserId).indexOf(data.oPayload.sRequesterId);
      /** Добавляем человека во входящие в запросах, если его там нет. Иначе меняем число запросов */
      if (index >= 0) {
        dispatch({ type: AddUserToRequests.Success, payload: { addSocketUser: inboxUsers[index] } });
      } else {
        dispatch({ type: AddUserToRequests.Pending, payload: data.oPayload.sRequesterId });
      }

      /** Если ID активного пользователя совпадает с ID и URL, добавляем ему новый запрос */
      dispatch({
        type: AddUserRequest.Success, payload: {
          addAssessment: {
            assessment: data.oPayload,
            userId: data.oPayload.sRequesterId
          }
        }
      });
    }
  }, [dispatch, inboxUsers]);

  /** Подписываемся на топик */
  useSocketSubscribe(usersLoaded, `user/${(loggedUser as IUser).sUserId}`, socketCallback);

  // ========================================================================================================

  /** Подписываемся на флаг bHasNext для пагинации */
  const bHasNext: boolean = useSelector((store: IStore) => store.userRequest.users.bHasNext, customEqual);

  /** Лениво догружаем юзеров. Номер страницы лежит в замыкании */
  const loadUsers = (bHasNext: boolean) => {
    return (page: number, setPage: Function) => {
      if (bHasNext) {
        dispatch({ type: GetUsersWithRequest.Pending, payload: { iPage: page, iSize } });
        setPage();
      }
    }
  };

  // ========================================================================================================

  /** Обработка фильтра */
  const handleFilter = (name: string) => {
    dispatch({ type: SetIncomeRequestsUsersFilter.Pending, payload: { iPage: 0, iSize, sUserFIO: name } });
  };

  // ========================================================================================================

  /** Если юзеры получены, отображаем контейнер */
  const asideUsersJSX = usersLoaded ?
    <AsideUsers users={inboxUsers} lazyLoad={loadUsers(bHasNext)} handleFilter={handleFilter} title='Все запросы'/>
    : 'Загрузка';

  return (
    <>
      {asideUsersJSX}
    </>
  );
};
