import React, { useCallback, useEffect, useState } from 'react';
import './HomeParticipants.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../../../../_store/reducers/users-all.reducer';
import FeedbackMenu from '../../../_shared/FeedbackMenu/FeedbackMenu';
import Modal from 'antd/lib/modal';
import { SetCurrentUser } from '../../../../_store/actions/users.action';
import HomeUsersList from './HomeUsersList/HomeUsersList';
import { AddUserToInbox, GetInboxAll } from '../../../../_store/actions/users-inbox.action';
import { GetRecentUsers } from '../../../../_store/actions/users-recent.action';
import { IStore } from '../../../../_store/store.interface';
import { animateExit, customEqual } from '../../../../_helpers/helpers';
import { IAllInboxResponse, IAssessmentsCount } from '../../../../_store/reducers/users-inbox.reducer';
import { IStringMap, useSocketSubscribe } from '../../../../_helpers/socket';
import useReactRouter from 'use-react-router';
import { ReactComponent as CloseIcon } from '../../../../_assets/svg/close.svg';
import PopupMobileWrapper from '../../../_shared/PopupMobileWrapper/PopupMobileWrapper';

const HomeParticipants: React.FC = () => {
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  /** Подписываемся на вошедшего юзера */
  const loggedUser: IUser | null = useSelector((store: IStore) => store.users.me, customEqual);

  /** Получение списка входящих запросов */
  const inbox: IAllInboxResponse = useSelector(
    (store: IStore) => store.inboxReducer.inbox,
    customEqual
  );

  /** Получение списка входящих запросов */
  const requests: IAllInboxResponse = useSelector(
    (store: IStore) => store.inboxReducer.requests,
    customEqual
  );

  /** Получение списка недавних юзеров */
  const recentUsers: IUser[] = useSelector(
    (store: IStore) => store.recentUsers.collection,
    customEqual
  );

  /** Флаг загрузки входящих юзеров */
  const inboxLoaded: boolean = useSelector((store: IStore) => store.inboxReducer.inboxLoaded, customEqual);

  /** Флаг загрузки недавних юзеров */
  const recentUsersLoaded: boolean = useSelector((store: IStore) => store.recentUsers.usersLoaded, customEqual);

  /** Получение текущего пользователя */
  const currentUser: IUser | null = useSelector(
    (store: IStore) => store.users.currentUser,
    customEqual
  );

  /** Получение количества оценок и запросов */
  const assessmentsCount: IAssessmentsCount = useSelector(
    (store: IStore) => store.inboxReducer.assessmentsCount,
    customEqual
  );

  /** Активный список */
  const lists: IStringMap<IUser[]> = {
    '1': inbox.aObjects,
    '2': requests.aObjects,
    '3': recentUsers
  };

  // ========================================================================================================

  useEffect(() => {
    dispatch({
      type: GetInboxAll.Pending, payload: {
        iPage: 0,
        iSize: 15,
        lId: 0,
        sLoadOption: 'INBOX'
      }
    });
  }, [dispatch]);

  /** Отображение попапа с выбранным пользователем */
  const [showFeedbackPopup, toggleFeedbackPopup] = useState(false);

  /** Открытие попапа или переход по роуту */
  const handleClick = (user: IUser) => {
    switch (activeLink) {
      case 1:
        history.push(`/history/${user.sUserId}`);
        break;
      case 2:
        history.push(`/income-requests/${user.sUserId}`);
        break;
      case 3:
        toggleFeedbackPopup(true);
        dispatch({ type: SetCurrentUser.Pending, payload: { currentUser: user } });
        break;
      default:
        toggleFeedbackPopup(true);
        dispatch({ type: SetCurrentUser.Pending, payload: { currentUser: user } });
    }
  };

  /** Закрытие попапа */
  const handleFeedbackPopupClose = () => {
    animateExit(() => toggleFeedbackPopup(false));

    setTimeout(
      () => {
        dispatch({
          type: SetCurrentUser.Success,
          payload: { currentUser: {} }
        })
      },
      500
    );
  };

  // -------------------------------------------------------------------------------------------------------------------

  /** Активная вкладка */
  const [activeLink, setActiveLink] = useState<number>(1);

  /** Навигация между вкладками */
  const navigation = [
    {
      id: 1,
      label: 'Оценки',
      handler: () => {
        if (activeLink !== 1) {
          setActiveLink(1);
          dispatch({
            type: GetInboxAll.Pending, payload: {
              iPage: 0,
              iSize: 15,
              lId: 0,
              sLoadOption: 'INBOX'
            }
          });
        }
      }
    },
    {
      id: 2,
      label: 'Запросы',
      handler: () => {
        if (activeLink !== 2) {
          setActiveLink(2);
          /** Диспатчим получение недавних запросов, если их еще нет */
          dispatch({
            type: GetInboxAll.Pending, payload: {
              iPage: 0,
              iSize: 15,
              lId: 0,
              sLoadOption: 'UNPROCESSED_REQUESTS'
            }
          });
        }
      }
    },
    {
      id: 3,
      label: 'Недавние',
      handler: () => {
        if (activeLink !== 3) {
          setActiveLink(3);
          /** Диспатчим получение недавних запросов, если их еще нет */
          if (!recentUsersLoaded) {
            dispatch({ type: GetRecentUsers.Pending });
          }
        }
      }
    }
  ];

  /** JSX навигации */
  const navigationJSX = navigation.map((e) => (
    <button
      key={e.id}
      className={`home__participants-link ${
        e.id === activeLink ? 'home__participants-link--active' : ''
      }`}
      onClick={e.handler}>
      {e.label}
    </button>
  ));

  // ========================================================================================================

  /** Функция обработки данных из сокетов */
  const socketCallback = useCallback((data: any) => {
    if (data.sAction === 'addRequest') {
      const index = lists[activeLink].map((u) => u.sUserId).indexOf(data.oPayload.sRespondentId);
      if (index >= 0) {
        dispatch({
          type: AddUserToInbox.Success, payload: {
            addInboxUser: {
              user: lists[activeLink][index],
              type: 'UNPROCESSED_REQUESTS'
            }
          }
        });
      } else {
        dispatch({
          type: AddUserToInbox.Pending, payload: {
            user: data.oPayload.sRequesterId,
            type: 'UNPROCESSED_REQUESTS'
          }
        });
      }
    }

    if (data.sAction === 'addResponse' || data.sAction === 'addAssessment') {
      const index = lists[activeLink].map((u) => u.sUserId).indexOf(data.oPayload.sRespondentId);
      if (index >= 0) {
        dispatch({
          type: AddUserToInbox.Success, payload: {
            addInboxUser: {
              user: lists[activeLink][index],
              type: 'INBOX'
            }
          }
        });
      } else {
        dispatch({
          type: AddUserToInbox.Pending, payload: {
            user: data.oPayload.sRespondentId,
            type: 'INBOX'
          }
        });
      }
    }
  }, [dispatch, lists, activeLink]);

  /** Подписываемся на топик */
  useSocketSubscribe(inboxLoaded, `user/${(loggedUser as IUser).sUserId}`, socketCallback);

  // ========================================================================================================

  return (
    <>
      <nav className='home__participants-navigation'>{navigationJSX}</nav>

      <div className='home__participants-row'>
        <HomeUsersList
          items={lists[activeLink]}
          activeLink={activeLink}
          assessmentsCount={assessmentsCount}
          handleClick={handleClick}
        />
      </div>

      <Modal
        closeIcon={<CloseIcon/>}
        centered={true}
        visible={showFeedbackPopup}
        footer={null}
        onCancel={handleFeedbackPopupClose}
        width={470}
        className='custom-modal'>
        <PopupMobileWrapper handleClose={handleFeedbackPopupClose}>
          <FeedbackMenu
            currentUser={currentUser}
            type={activeLink === 1 ? 'inbox' : 'default'}
            closeHandler={handleFeedbackPopupClose}
          />
        </PopupMobileWrapper>
      </Modal>
    </>
  );
};

export default HomeParticipants;
