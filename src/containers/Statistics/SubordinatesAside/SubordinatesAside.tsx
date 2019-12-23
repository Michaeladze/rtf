import React, { useEffect, useState } from 'react';
import './SubordinatesAside.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../../_store/store.interface';
import { customEqual } from '../../../_helpers/helpers';
import AsideUsers from '../../_shared/AsideUsers/AsideUsers';
import { GetSubordinates } from '../../../_store/actions/subordinates.action';
import { IUser } from '../../../_store/reducers/users-all.reducer';
import { selectSubordinatesList } from '../../../_store/selectors/users.selectors';
import useReactRouter from 'use-react-router';
import { ClearLoadingFlag } from '../../../_store/actions/statistics.action';

const SubordinatesAside: React.FC = () => {
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  /** Количество подгружаемых пользователей */
  const [iSize] = useState(25);

  /** Флаг загрузки подчиненных */
  const usersLoaded: boolean = useSelector((store: IStore) => store.subordinates.usersLoaded, customEqual);

  /** Диспатчим получение команды текущего пользователя */
  useEffect(() => {
    if (!usersLoaded) {
      dispatch({ type: GetSubordinates.Pending, payload: { iPage: 0, iSize } });
    }
  }, [dispatch, usersLoaded, iSize]);

  /** Подписываемся на подчиненных */
  const subordinates: IUser[] = useSelector(selectSubordinatesList, customEqual);

  /** Подписываемся на флаг bHasNext для пагинации */
  const bHasNext: boolean = useSelector((store: IStore) => store.subordinates.collection.bHasNext, customEqual);

  /** Догрузка подчиненных */
  const loadUsers = (bHasNext: boolean) => {
    return (page: number, setPage: Function) => {
      if (bHasNext) {
        dispatch({
          type: GetSubordinates.Pending,
          payload: { iPage: page, iSize }
        });
        setPage();
      }
    }
  };

  /** Обработка клика по карточке */
  const onUserClick = (user: IUser) => {
    /** Сбрасываем флаг загрузки по текущему подчиненному */
    dispatch({ type: ClearLoadingFlag.Set, payload: { flag: true } });
    history.push(`${user.sUserId}`);
  };

  /** Обработка фильтра */
  const handleFilter = (name: string) => {
    dispatch({ type: GetSubordinates.Pending, payload: { iPage: 0, iSize, sUserFIO: name } });
  };

  /** Переход на предыдущую страницу */
  const goBack = () => {
    history.push('/team-statistics');
  };

  /** Отрисовка подчиненных */
  const asideUsersJSX = usersLoaded ?
    <AsideUsers
      users={subordinates}
      lazyLoad={loadUsers(bHasNext)}
      onUserClick={onUserClick}
      handleFilter={handleFilter}
      title='Все сотрудники'
      goBack={goBack}/> : 'Загрузка...';

  return (
    <>
      {asideUsersJSX}
    </>
  );
};

export default SubordinatesAside;
