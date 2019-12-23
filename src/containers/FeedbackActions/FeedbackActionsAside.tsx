import React, { useEffect, useState } from 'react';
import AsideUsers from '../_shared/AsideUsers/AsideUsers';
import { useDispatch, useSelector } from 'react-redux';
import { GetRecentUsers } from '../../_store/actions/users-recent.action';
import { IUser } from '../../_store/reducers/users-all.reducer';
import { IStore } from '../../_store/store.interface';
import { customEqual } from '../../_helpers/helpers';
import FeedbackMenu from '../_shared/FeedbackMenu/FeedbackMenu';
import Modal from 'antd/lib/modal';
import { FilterActiveList, SetCurrentUser } from '../../_store/actions/users.action';
import useReactRouter from 'use-react-router';
import { selectRecentList } from '../../_store/selectors/users.selectors';
import { ReactComponent as CloseIcon } from '../../_assets/svg/close.svg';

export const FeedbackActionsAside: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const { history, location } = useReactRouter();

  /**  Отображение попапа с выбранным пользователем  */
  const [showFeedbackPopup, toggleFeedbackPopup] = useState(false);

  useEffect(() => {
    toggleFeedbackPopup(false);
  }, [location]);

  /** ----------------------------------------------------------------------------------------------------------------------
   * Получение данных из стора
   ---------------------------------------------------------------------------------------------------------------------- */
  /** Текущий пользователь */
  const currentUser: IUser | null = useSelector(
    (store: IStore) => store.users.currentUser,
    customEqual
  );

  /** Недавние пользователи */
  const aRecentUsers: IUser[] = useSelector(selectRecentList, customEqual);

  /** Флаг загрузки юзеров */
  const usersLoaded: boolean = useSelector(
    (store: IStore) => store.recentUsers.usersLoaded,
    customEqual
  );

  useEffect(() => {
    if (!usersLoaded) {
      dispatch({ type: GetRecentUsers.Pending });
    }
    /** Чистим фильтр, для сброса предыдущих результатов поиска */
    dispatch({ type: FilterActiveList.Success, payload: { searchInput: '' } });
  }, [dispatch, usersLoaded]);

  /** Закрытие попапа */
  const handleFeedbackPopupClose = () => {
    toggleFeedbackPopup(false);
    setTimeout(
      () =>
        dispatch({
          type: SetCurrentUser.Success,
          payload: { currentUser: {} }
        }),
      300
    );
  };

  /** Обработка клика по карточке */
  const onUserClick = (user: IUser) => {
    // toggleFeedbackPopup(true);
    // dispatch({ type: SetCurrentUser.Success, payload: { currentUser: user } });
    history.push(`${user.sUserId}`);
  };

  /** Обработка фильтра */
  const setFilter = (name: string) => {
    dispatch({ type: FilterActiveList.Success, payload: { searchInput: name } });
  };

  /** Если юзеры получены, отображаем контейнер */
  const asideUsersJSX = usersLoaded ?
    <AsideUsers onUserClick={onUserClick} users={aRecentUsers} handleFilter={setFilter} title='Недавние'/> :
    'Loading...';

  return (
    <>
      {asideUsersJSX}

      <Modal
        closeIcon={<CloseIcon/>}
        centered={true}
        width={470}
        visible={showFeedbackPopup}
        footer={null}
        onCancel={handleFeedbackPopupClose}
        className='custom-modal'>
        <FeedbackMenu currentUser={currentUser}/>
      </Modal>
    </>
  );
});
