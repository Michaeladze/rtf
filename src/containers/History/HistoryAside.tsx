import React, { useEffect, useState } from 'react';
import { GetUserHistory, SetHistoryUsersFilter } from '../../_store/actions/users-history.action';
import AsideUsers from '../_shared/AsideUsers/AsideUsers';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../../_store/reducers/users-all.reducer';
import { IStore } from '../../_store/store.interface';
import { customEqual } from '../../_helpers/helpers';
import { selectHistoryList } from '../../_store/selectors/users.selectors';

const HistoryAside: React.FC = () => {
  const dispatch = useDispatch();
  const [iSize] = useState(15);

  /** Флаг загрузки юзеров */
  const usersLoaded: boolean = useSelector(
    (store: IStore) => store.userHistory.usersLoaded,
    customEqual
  );

  useEffect(() => {
    if (!usersLoaded) {
      dispatch({ type: GetUserHistory.Pending, payload: { iPage: 0, iSize } });
    }

    /** Чистим фильтр, для сброса предыдущих результатов поиска */
    return () => {
      if (usersLoaded) {
        dispatch({ type: SetHistoryUsersFilter.Pending, payload: { iPage: 0, iSize, sUserFIO: null } });
      }
    }
  }, [dispatch, iSize, usersLoaded]);

  /** Все пользователи */
  const users: IUser[] = useSelector(selectHistoryList, customEqual);

  /** Подписываемся на флаг bHasNext для пагинации */
  const bHasNext: boolean = useSelector((store: IStore) => store.userHistory.users.bHasNext, customEqual);

  /** Лениво догружаем юзеров. Номер страницы лежит в замыкании */
  const loadUsers = (bHasNext: boolean) => {
    return (page: number, setPage: Function) => {
      if (bHasNext) {
        dispatch({ type: GetUserHistory.Pending, payload: { iPage: page, iSize } });
        setPage();
      }
    }
  };

  /** Обработка фильтра */
  const handleFilter = (name: string) => {
    dispatch({ type: SetHistoryUsersFilter.Pending, payload: { iPage: 0, iSize, sUserFIO: name } });
  };

  /** Отрисовка юзеров */
  const asideUsersJSX = usersLoaded ?
    <AsideUsers users={users} lazyLoad={loadUsers(bHasNext)} handleFilter={handleFilter} title='Все контакты'/> :
    'Загрузка...';

  return (
    <>
      {asideUsersJSX}
    </>
  );
};

export default HistoryAside;
