import React, { useCallback, useEffect, useState } from 'react';
import './AsideUsers.scss';
import AsideUsersList from './AsideUsersList/AsideUsersList';
import AsideUsersSearch from './AsideUsersSearch/AsideUsersSearch';
import { IUser } from '../../../_store/reducers/users-all.reducer';
import UserCard from '../UserCard/UserCard';
import useReactRouter from 'use-react-router';
import { GetUserById, SetActiveUser } from '../../../_store/actions/users.action';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../../_store/store.interface';
import { useLazyLoad } from '../../../_helpers/helpers';
import GoBackButton from '../../../components/GoBackButton';

interface IAsideUsersProps {
  /** Список пользователей */
  users: IUser[];
  /** Заголовок */
  title: string;
  /** Клик по карточке */
  onUserClick?: (user: IUser) => void;
  /** Ленивая загрузка */
  lazyLoad?: (page: number, setPage: Function) => void;
  /** Обработка фильтра */
  handleFilter?: (name: string) => void;
  /** Вернуться назад */
  goBack?: () => void;
}

const AsideUsers: React.FC<IAsideUsersProps> = ({
  users,
  title,
  onUserClick,
  lazyLoad,
  handleFilter,
  goBack
}) => {

  const dispatch = useDispatch();

  /** Активный пользователь для фидбека */
  const activeUser: IUser | null = useSelector((store: IStore) => store.users.activeUser);

  /** ----------------------------------------------------------------------------------------------------------------------
   * Получение пользователя из роутера
   ---------------------------------------------------------------------------------------------------------------------- */
  const { location, history } = useReactRouter();
  const locationArray = location.pathname.split('/');
  /** Проверка на страницу статистики */
  const isStatisticsPage = location.pathname.indexOf('statistics') >= 0;
  const routerUser = isStatisticsPage ? locationArray[3] : locationArray[2];

  /** Функция устанавливает активного пользователя из списка пользователей */
  const setActiveUserFromList = useCallback(() => {
    if (users.length > 0) {
      /** Если в списке пользователей есть люди */
      if (!routerUser) {
        /** Если в роутере нет ID пользователя, делаем редирект */
        history.push(`${location.pathname}/${users[0].sUserId}`);
      } else {
        /** Если в роутере есть ID пользователя, ищем его */
        const index = users.findIndex((u) => u.sUserId === routerUser);

        if (index >= 0) {
          /** Если пользователь есть в массиве, делаем его активным */
          dispatch({
            type: SetActiveUser.Success,
            payload: { currentUser: users[index], previousUser: activeUser || null }
          });
        } else {
          /** Если пользователя нет в массиве, ищем его в Search Service */
          dispatch({
            type: GetUserById.Pending,
            payload: { sUserId: routerUser }
          });
        }
      }
    } else {
      if (routerUser) {
        /** Если в списке пользователей нет людей, ищем его в Search Service */
        dispatch({
          type: GetUserById.Pending,
          payload: { sUserId: routerUser }
        });
      }
    }
  }, [dispatch,
    routerUser,
    users,
    history,
    location.pathname]);

  /** ----------------------------------------------------------------------------------------------------------------------
   * Устанавливаем активного юзера
   ---------------------------------------------------------------------------------------------------------------------- */
  useEffect(() => {
    if (!activeUser) {
      /** Если нет активного пользователя */
      setActiveUserFromList();
    } else {
      /** Если есть активный пользователь */
      if (!routerUser) {
        /** Если в роутере нет ID пользователя, пушим в роутер ID активного пользователя */
        history.push(`${location.pathname}/${activeUser.sUserId}`);
      } else {
        if (activeUser.sUserId !== routerUser) {
          /** Если ID активного пользователя и роутер ID не совпадают, запускаем if (!activeUser)  */
          setActiveUserFromList();
        }
      }
    }
  }, [activeUser,
    history,
    location.pathname,
    routerUser,
    setActiveUserFromList]);

  /** ----------------------------------------------------------------------------------------------------------------------
   * Меняем число ОС у активного юзера
   ---------------------------------------------------------------------------------------------------------------------- */
  useEffect(() => {
    if (activeUser) {
      const index = users.map((u) => u.sUserId).indexOf(activeUser.sUserId);
      if (index >= 0) {
        activeUser.iIncomeRequests = users[index].iIncomeRequests;
      }
    }
  }, [users, activeUser]);

  /** ----------------------------------------------------------------------------------------------------------------------
   * Ленивая загрука
   ---------------------------------------------------------------------------------------------------------------------- */
  /** Номер страницы */
  const [page, setPage] = useState(1);

  useLazyLoad(document.querySelector<HTMLDivElement>('.aside__user-list'), () => {
    lazyLoad && lazyLoad(page, () => setPage(page + 1));
  });

  /** ----------------------------------------------------------------------------------------------------------------------
   * Строка поиска по ФИО
   ---------------------------------------------------------------------------------------------------------------------- */
  const searchField = handleFilter && <AsideUsersSearch setFilter={handleFilter}/>;

  /** ----------------------------------------------------------------------------------------------------------------------
   * Кнопка назад
   ---------------------------------------------------------------------------------------------------------------------- */
  const goBackButtonJSX = goBack && <GoBackButton goBack={goBack} label='Вернуться назад'/>;

  /** =============================================================================================================== */

  return (
    <>
      <div className='aside__top'>
        {goBackButtonJSX}
        {searchField}
        {activeUser && (
          <UserCard key={activeUser.sUserId} user={activeUser} isActive={true} onUserClick={onUserClick}/>
        )}
      </div>

      <div className='aside__list'>
        {users && users.length > 0 && (
          <AsideUsersList users={users} title={title} onUserClick={onUserClick}/>
        )}
      </div>
    </>
  );
};

export default AsideUsers;
