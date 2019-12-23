import React, { useEffect, useState } from 'react';
import './FeedbackMain.scss';
import 'antd/lib/button/style/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBlock } from './SearchBlock/SearchBlock';
import { IUser } from '../../_store/reducers/users-all.reducer';
import { IStore } from '../../_store/store.interface';
import { animateExit, customEqual } from '../../_helpers/helpers';
import { FeedbackRecentUsers } from './FeedbackRecentUsers/FeedbackRecentUsers';
import { FeedbackUserCard } from './FeedbackUserCard/FeedbackUserCard';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import { AddColleagueToFavPopup } from '../popups/AddColleagueToFavPopup/AddColleagueToFavPopup';
import FeedbackMenu from '../_shared/FeedbackMenu/FeedbackMenu';
import { SetCurrentUser } from '../../_store/actions/users.action';
import { GetRecentUsers } from '../../_store/actions/users-recent.action';
import { DeleteFromFav, GetFavFeedbackUsers, SetPinForFav } from '../../_store/actions/users-favourite.action';
import { ReactComponent as PlusIcon } from '../../_assets/svg/plus.svg';
import { selectSearchResult } from '../../_store/selectors/users.selectors';
import { ReactComponent as CloseIcon } from '../../_assets/svg/close.svg';
import PopupMobileWrapper from '../_shared/PopupMobileWrapper/PopupMobileWrapper';
import DeletePopup from '../popups/DeletePopup';

export const FeedbackMain: React.FC = () => {
  const dispatch = useDispatch();

  /** ----------------------------------------------------------------------------------------------------------------------
   * Хуки для отображения попапов
   ---------------------------------------------------------------------------------------------------------------------- */
  /** Отображение попапа для добавления/удаления из Избранного */
  const [showAddToFavPopup, toggleAddToFavPopup] = useState(false);

  /** Отображение попапа с выбранным пользователем */
  const [showFeedbackPopup, toggleFeedbackPopup] = useState(false);

  /** Отображение крестика в режиме редактирования на мобильных */
  const [isMobileEdit, toggleMobileEdit] = useState(false);

  /** Отображение попапа с удалением из избранного */
  const [showDeletePopup, toggleDeletePopup] = useState(false);

  /** ----------------------------------------------------------------------------------------------------------------------
   * Попап добавления/удаления из Избранного
   ---------------------------------------------------------------------------------------------------------------------- */
  /** Открытие попапа  */
  const openDialog = () => {
    toggleAddToFavPopup(true);
  };

  /** Закрытие попапа */
  const handleClose = () => {
    animateExit(() => toggleAddToFavPopup(false));
  };

  /** ----------------------------------------------------------------------------------------------------------------------
   * Получение данных из стора
   ---------------------------------------------------------------------------------------------------------------------- */
  /** Получение списка всех существующих пользователей */
  const allUsers: IUser[] = useSelector(selectSearchResult, customEqual);

  /** Получение последних запрашиваемых пользователей */
  const aRecentUsers: IUser[] = useSelector((store: IStore) => store.recentUsers.collection, customEqual);

  /** Получение избранных пользователей */
  const aFavouriteUsers: IUser[] = useSelector((store: IStore) => store.favouriteUsers.collection, customEqual);

  /** Флаг загрузки недавних юзеров */
  const recentUsersLoaded: boolean = useSelector((store: IStore) => store.recentUsers.usersLoaded, customEqual);

  /** Флаг загрузки избранных юзеров */
  const favUsersLoaded: boolean = useSelector((store: IStore) => store.favouriteUsers.usersLoaded, customEqual);

  /** Получение текущего пользователя */
  const currentUser: IUser | null = useSelector((store: IStore) => store.users.currentUser, customEqual);

  useEffect(() => {
    if (!recentUsersLoaded) {
      dispatch({ type: GetRecentUsers.Pending });
    }
  }, [dispatch, recentUsersLoaded]);

  useEffect(() => {
    if (!favUsersLoaded) {
      dispatch({ type: GetFavFeedbackUsers.Pending });
    }
  }, [dispatch, favUsersLoaded]);

  /** ----------------------------------------------------------------------------------------------------------------------
   * Попап с активным пользователем
   ---------------------------------------------------------------------------------------------------------------------- */
  /** Открытие попапа */
  const handleClick = (user: IUser) => {
    toggleFeedbackPopup(true);
    dispatch({ type: SetCurrentUser.Success, payload: { currentUser: user } });
  };

  /** Открытие попапа из дропдауна */
  const handleDropdownClick = (user: IUser) => {
    toggleFeedbackPopup(true);
    dispatch({ type: SetCurrentUser.Success, payload: { currentUser: user } });
  };

  /** Закрытие попапа */
  const handleFeedbackPopupClose = () => {
    animateExit(() => toggleFeedbackPopup(false));
    setTimeout(
      () =>
        dispatch({
          type: SetCurrentUser.Success,
          payload: { currentUser: {} }
        }),
      500
    );
  };

  /** ----------------------------------------------------------------------------------------------------------------------
   * Действия с карточкой пользователя
   ---------------------------------------------------------------------------------------------------------------------- */
  /** Запинивание (Избранное) */
  const handlePin = (user: IUser) => {
    if (user.bIsPinned === undefined) {
      user.bIsPinned = false;
    }

    user.bIsPinned = !user.bIsPinned;
    dispatch({ type: SetPinForFav.Pending, payload: user });
  };

  /** ----------------------------------------------------------------------------------------------------------------------
   * Попап подтверждения удаления из избранного
   ---------------------------------------------------------------------------------------------------------------------- */
  /** Закрытие попапа */
  const closeDeletePopup = () => {
    animateExit(() => toggleDeletePopup(false));
  };

  /** Удаление из списка (Избранное) */
  const [confirmDelete, setConfirmDelete] = useState<() => void>(() => {});
  const handleDelete = (user: IUser) => {
    toggleDeletePopup(true);
    setConfirmDelete(() => {
      return () => {
        dispatch({ type: DeleteFromFav.Pending, payload: user });
        closeDeletePopup();
      }
    })
  };

  /** ----------------------------------------------------------------------------------------------------------------------
   * Избранные пользователи JSX
   ---------------------------------------------------------------------------------------------------------------------- */
  const aFavUsers = aFavouriteUsers.map((item: IUser) => (
    <li
      className='feedback__user-card'
      onClick={() => handleClick(item)}
      key={item.sUserId}>
      <FeedbackUserCard
        user={item}
        onDelete={handleDelete}
        onPin={handlePin}
        isMobileEdit={isMobileEdit}
      />
    </li>
  ));

  /** ----------------------------------------------------------------------------------------------------------------------
   * Переключение в режим редактирования на мобильных
   ---------------------------------------------------------------------------------------------------------------------- */
  const onMobileEditClick = () => {
    toggleMobileEdit(!isMobileEdit);
  };

  const editMobileButton = () =>
    isMobileEdit ? (
      <button className='feedback__edit' onClick={onMobileEditClick}>Сохранить</button>
    ) : (
      <button className='feedback__edit' onClick={onMobileEditClick}>Изменить</button>
    );

  return (
    <>
      <section className='feedback'>
        <div className='feedback__search'>
          <SearchBlock result={allUsers} onUserClick={handleDropdownClick}/>
        </div>

        {aRecentUsers && aRecentUsers.length > 0 && (
          <div className='feedback__group'>
            <div className='feedback__group-header'>
              <h4 className='feedback__group-title'>Недавние</h4>
            </div>
            <div className='feedback__users'>
              <FeedbackRecentUsers users={aRecentUsers} onClick={handleClick}/>
            </div>
          </div>
        )}

        <div className='feedback__group'>
          <div className='feedback__group-header'>
            <h4 className='feedback__group-title'>Избранное</h4>
            {editMobileButton()}
          </div>
          <div className='feedback__users'>
            <ul className='feedback__users-inner'>
              <li className='feedback__user-card' onClick={openDialog}>
                <div className='feedback-user-card'>
                  <div className='feedback-user-card__image'>
                    <Button
                      className='feedback-user-card__add'
                      size='large'
                      shape='round'>
                      <PlusIcon className='feedback-user-card__icon'/>
                    </Button>
                  </div>
                  <p className='feedback-user-card__name'>
                    Добавить <br/>
                    коллегу
                  </p>
                </div>
              </li>

              {aFavUsers && aFavUsers.length > 0 && aFavUsers}
            </ul>
          </div>
        </div>
      </section>

      <Modal
        closeIcon={<CloseIcon/>}
        bodyStyle={{ height: '80vh' }}
        centered={true}
        visible={showAddToFavPopup}
        footer={null}
        onCancel={handleClose}
        width={470}
        className='custom-modal'>
        <PopupMobileWrapper handleClose={handleClose}>
          <AddColleagueToFavPopup aFavouriteUsers={aFavouriteUsers}/>
        </PopupMobileWrapper>
      </Modal>

      <Modal
        closeIcon={<CloseIcon/>}
        centered={true}
        visible={showFeedbackPopup}
        footer={null}
        onCancel={handleFeedbackPopupClose}
        width={470}
        className='custom-modal'>
        <PopupMobileWrapper handleClose={handleFeedbackPopupClose}>
          <FeedbackMenu currentUser={currentUser}/>
        </PopupMobileWrapper>
      </Modal>

      <Modal
        closeIcon={<CloseIcon/>}
        centered={true}
        visible={showDeletePopup}
        footer={null}
        onCancel={closeDeletePopup}
        width={470}
        className='custom-modal'>
        <PopupMobileWrapper handleClose={closeDeletePopup}>
          <DeletePopup
            title='Удаление'
            subtitle='Вы уверены, что хотите удалить пользователя из избранного?'
            onOk={confirmDelete} onCancel={closeDeletePopup}
          />
        </PopupMobileWrapper>
      </Modal>
    </>
  );
};
