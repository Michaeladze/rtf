import './NotificationList.scss';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import {
  INotification,
  INotificationsState
} from '../redux/notifications.reducer';

import { Notification } from './notificationItem/Notification';

export const NotificationList = React.memo(() => {
  /**
   * Получаем все уведомления из стора
   */
  const aNotificationsStore = useSelector(
    (store: { notifications: INotificationsState }) =>
      store.notifications.collection,
    shallowEqual
  ) as INotification[];

  /**
   * Отрисовываем все уведомления, которые есть в сторе
   */
  const aNotifications = aNotificationsStore.map(
    ({ sMessage, iStatus, iId, iShowTime }: INotification, i: number) => (
      <li className='notifications__item' key={i}>
        <Notification
          iShowTime={iShowTime}
          sMessage={sMessage}
          iStatus={iStatus}
          iId={iId}
        />
      </li>
    )
  );

  return <ul className='notifications  list-style-reset'>{aNotifications}</ul>;
});
