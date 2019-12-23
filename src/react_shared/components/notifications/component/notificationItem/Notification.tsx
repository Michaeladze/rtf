import './Notification.scss';
import React from 'react';
import { INotification } from '../../redux/notifications.reducer';
import { deleteNotification } from '../../notification';
import { ReactComponent as CloseIcon } from '../../../../../_assets/svg/close.svg';

export const Notification: React.FC<INotification> = React.memo(
  ({ iShowTime, sMessage, iStatus, iId = 0 }) => {
    /** Выставляем класс .error, если приходит статус 0 (Ошибка) */
    const errorClassName = iStatus === 0 ? 'error' : '';
    let obj: { sTitle: string; sNotificationColor: string };
    switch (iStatus) {
      case 0:
        obj = {
          sTitle: 'Ошибка',
          sNotificationColor: '#ff212d'
        };
        break;
      case 1:
        obj = {
          sTitle: '',
          sNotificationColor: '#35bf2d'
        };
        break;
      case 2:
        obj = {
          sTitle: 'Информация',
          sNotificationColor: '#4a90e2'
        };
        break;
      case 3:
        obj = {
          sTitle: 'Спасибо',
          sNotificationColor: '#35bf2d'
        };
        break;
      default:
        obj = {
          sTitle: '',
          sNotificationColor: '#fff'
        };
    }

    /** Кнопка закрытия уведомления */
    const closeButton: React.ReactNode = (
      <button
        className='notification__close-button'
        type='button'
        onClick={() => deleteNotification(iId)}>
        <CloseIcon/>
      </button>
    );

    return (
      <>
        <span className={`notification ${errorClassName}`}>
          {/*<NotificationTitle object={obj} iStatus={iStatus} />*/}
          <span>{sMessage}</span>
          {closeButton}
          {/*<span*/}
          {/*  className='notification__progress'*/}
          {/*  style={{*/}
          {/*    animationDuration: `${iShowTime}ms`,*/}
          {/*    backgroundColor: obj.sNotificationColor*/}
          {/*  }}*/}
          {/*/>*/}
        </span>
      </>
    );
  }
);
