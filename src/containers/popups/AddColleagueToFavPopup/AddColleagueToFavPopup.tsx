import React, { useEffect, useRef } from 'react';
import './AddColleagueToFavPopup.scss';
import ActionPopup from '../../_shared/ActionPopup/ActionPopup';
import { IUser } from '../../../_store/reducers/users-all.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../../_store/store.interface';
import { customEqual } from '../../../_helpers/helpers';
import Search from '../../_shared/Search/Search';
import { GetAllUsers } from '../../../_store/actions/users-all.action';
import { SearchItem } from './SearchItem/SearchItem';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { GetMyTeam } from '../../../_store/actions/users-team.action';
import { AddToFeedbackFav, DeleteFromFav } from '../../../_store/actions/users-favourite.action';
import { ReactComponent as CheckIcon } from '../../../_assets/svg/check.svg';
import { ReactComponent as PlusIcon } from '../../../_assets/svg/plus.svg';
import { selectSearchResult } from '../../../_store/selectors/users.selectors';
import { notification, sendNotification } from '../../../react_shared/components/notifications/notification';

interface IAddColleagueToFavPopupProps {
  aFavouriteUsers: IUser[];
}

export const AddColleagueToFavPopup: React.FC<IAddColleagueToFavPopupProps> = React.memo(({ aFavouriteUsers }) => {
  const dispatch = useDispatch();

  /** Ссылка на input с поиском */
  const searchUser = useRef<HTMLInputElement>(null);

  /** Получение команды текущего пользователя */
  const myTeam: IUser[] = useSelector(
    (store: IStore) => store.myTeam.collection,
    customEqual
  );

  /** Получение списка всех существующих пользователей */
  const allUsers: IUser[] = useSelector(selectSearchResult, customEqual);

  /** Флаг загрузки юзеров */
  const usersLoaded: boolean = useSelector((store: IStore) => store.myTeam.usersLoaded, customEqual);

  /** Диспатчим получение команды текущего пользователя */
  useEffect(() => {
    if (!usersLoaded) {
      dispatch({ type: GetMyTeam.Pending });
    }
  }, [dispatch, usersLoaded]);

  /** Проверяем наличие юзера в списке */
  const userInList = (user: IUser) => {
    return aFavouriteUsers.findIndex((u) => u.sUserId === user.sUserId) >= 0;
  };

  /** Поиск пользователей по ФИО */
  useEffect(() => {
    const sub = fromEvent(searchUser.current as HTMLInputElement, 'keyup')
      .pipe(
        map((a: Event) => (a.target as HTMLInputElement).value),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((inputString: string) => {
        if (inputString) {
          dispatch({ type: GetAllUsers.Pending, payload: inputString });
        }
      });
    return () => sub.unsubscribe();
  }, [dispatch]);

  /** Очистка поля ввода и сброс результатов поиска */
  const handleClearTextInput = () => {
    if (searchUser.current && searchUser.current.value.length) {
      searchUser.current.value = '';
      dispatch({ type: GetAllUsers.Success, payload: { users: [] } });
    }
  };

  /** Добавление/удаление из избранного */
  const toggleUser = (user: IUser) => {
    if (userInList(user)) {
      dispatch({ type: DeleteFromFav.Pending, payload: user });
    } else {
      dispatch({ type: AddToFeedbackFav.Pending, payload: user });
      sendNotification({ sMessage: notification.userAdded })
    }
  };

  /** Моя команда */
  const myTeamItems = myTeam.map((user: IUser) => (
    <li className='add-to-fav__list-item' key={user.sUserId}>
      <SearchItem
        user={user}
        onClick={toggleUser}
        icon={
          userInList(user) ? (
            <CheckIcon className='search-icon'/>
          ) : (
            <PlusIcon className='search-icon search-icon--plus'/>
          )
        }
      />
    </li>
  ));

  /** Результаты поиска */
  const searchResult = allUsers.map((user: IUser) => (
    <li className='add-to-fav__list-item' key={user.sUserId}>
      <SearchItem
        user={user}
        onClick={toggleUser}
        icon={
          userInList(user) ? (
            <CheckIcon className='search-icon'/>
          ) : (
            <PlusIcon className='search-icon search-icon--plus'/>
          )
        }
      />
    </li>
  ));

  /** Обработка тач скролла */
  const onTouchMove = (e: React.TouchEvent) => {
    //@ts-ignore
    const scrollView = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode;

    if ((scrollView as HTMLDivElement).scrollTop > 0) {
      e.stopPropagation();
    }
  };

  return (
    <>
      <ActionPopup titleText='Добавить коллег'>
        <div className='add-to-fav' onTouchMove={onTouchMove}>
          <div className='add-to-fav__search'>
            <Search
              refName={searchUser}
              handleClick={handleClearTextInput}
              placeholder='Поиск по ФИО'
            />
          </div>

          <div className='add-to-fav__group'>
            {allUsers.length > 0 ? (
              <>
                <h6 className='add-to-fav__group-title'>
                  Найдено {allUsers.length} коллег
                </h6>
                <ul className='add-to-fav__list'>{searchResult}</ul>
              </>
            ) : (
              <>
                {myTeam && myTeam.length > 0 ? (
                  <>
                    <h6 className='add-to-fav__group-title'>Моя команда</h6>
                    <ul className='add-to-fav__list'>{myTeamItems}</ul>
                  </>
                ) : (
                  <p className='info-tip'>Данные по вашей команде не пришли</p>
                )}
              </>
            )}
          </div>
        </div>
      </ActionPopup>
    </>
  );
});
